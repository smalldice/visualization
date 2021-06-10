import { useCallback, useEffect, useRef, useState } from "react";
import IMAGE_CHAI from "../../images/chai.webp";
import "./texture.css";

type GL = WebGLRenderingContext;

const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = document.createElement("img");
    image.src = path;
    image.onload = () => {
      resolve(image);
    };
  });
};

const computeKernelWeight = (kernel: number[]): number => {
  const weight = kernel.reduce(function (prev, curr) {
    return prev + curr;
  });

  return weight <= 0 ? 1 : weight;
};

const kernels = {
  normal: [0, 0, 0, 0, 1, 0, 0, 0, 0],
  gaussianBlur: [0.045, 0.122, 0.045, 0.122, 0.332, 0.122, 0.045, 0.122, 0.045],
  gaussianBlur2: [1, 2, 1, 2, 4, 2, 1, 2, 1],
  gaussianBlur3: [0, 1, 0, 1, 1, 1, 0, 1, 0],
  unsharpen: [-1, -1, -1, -1, 9, -1, -1, -1, -1],
  sharpness: [0, -1, 0, -1, 5, -1, 0, -1, 0],
  sharpen: [-1, -1, -1, -1, 16, -1, -1, -1, -1],
  edgeDetect: [
    -0.125, -0.125, -0.125, -0.125, 1, -0.125, -0.125, -0.125, -0.125,
  ],
  edgeDetect2: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
  edgeDetect3: [-5, 0, 0, 0, 0, 0, 0, 0, 5],
  edgeDetect4: [-1, -1, -1, 0, 0, 0, 1, 1, 1],
  edgeDetect5: [-1, -1, -1, 2, 2, 2, -1, -1, -1],
  edgeDetect6: [-5, -5, -5, -5, 39, -5, -5, -5, -5],
  sobelHorizontal: [1, 2, 1, 0, 0, 0, -1, -2, -1],
  sobelVertical: [1, 0, -1, 2, 0, -2, 1, 0, -1],
  previtHorizontal: [1, 1, 1, 0, 0, 0, -1, -1, -1],
  previtVertical: [1, 0, -1, 1, 0, -1, 1, 0, -1],
  boxBlur: [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111],
  triangleBlur: [
    0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625,
  ],
  emboss: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
};

const setRectangle = (
  gl: GL,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  const points = new Float32Array([
    x1,
    y1,
    x2,
    y1,
    x1,
    y2,
    x1,
    y2,
    x2,
    y1,
    x2,
    y2,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
};

const Texture = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [gl, setGL] = useState<GL | null>(null);
  const setupGL = useCallback((gl: GL, points: Float32Array): WebGLProgram => {
    const vertex = `
    attribute vec2 position;
    attribute vec2 texCoord;

    uniform vec2 u_resolution;

    varying vec2 v_texCoord;

    void main() {
      vec2 zeroToOne = position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;

      gl_Position = vec4(clipSpace, 0.0, 1.0);
      v_texCoord = texCoord;
    }
  `;

    const fragment = `
    precision mediump float;

    uniform sampler2D u_image;
    uniform vec2 u_textureSize;
    uniform float u_kernel[9];
    uniform float u_kernelWeight;

    varying vec2 v_texCoord;

    void main() {
      vec2 onePixel = vec2(1.0, 1.0)/ u_textureSize;
      vec4 colorSum = 
        texture2D(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
        texture2D(u_image, v_texCoord + onePixel * vec2(0, -1))  * u_kernel[1] +
        texture2D(u_image, v_texCoord + onePixel * vec2(1, -1))  * u_kernel[2] +
        texture2D(u_image, v_texCoord + onePixel * vec2(-1, 0))  * u_kernel[3] +
        texture2D(u_image, v_texCoord + onePixel * vec2(0, 0))   * u_kernel[4] +
        texture2D(u_image, v_texCoord + onePixel * vec2(1, 0))   * u_kernel[5] +
        texture2D(u_image, v_texCoord + onePixel * vec2(-1, 1))  * u_kernel[6] +
        texture2D(u_image, v_texCoord + onePixel * vec2(0, -1))  * u_kernel[7] +
        texture2D(u_image, v_texCoord + onePixel * vec2(1, 1))   * u_kernel[8] ;
      
        gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1.0);
    }
  `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(vertexShader, vertex);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram() as WebGLProgram;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    return program;
  }, []);

  const howToDraw = useCallback(
    async (gl: GL, program: WebGLProgram, points: Float32Array) => {
      const chaiImage = await loadImage(IMAGE_CHAI);

      // buffer1
      const positionBuffer = gl.createBuffer() as WebGLBuffer;
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      setRectangle(gl, 0, 0, chaiImage.width, chaiImage.height);

      // buffer2
      const texcoordBuffer = gl.createBuffer() as WebGLBuffer;
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        ]),
        gl.STATIC_DRAW
      );

      // texture
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        chaiImage
      );

      // attributes & uniforms
      const positionLocation = gl.getAttribLocation(program, "position");
      const texcoordLocation = gl.getAttribLocation(program, "texCoord");
      const u_resolution = gl.getUniformLocation(program, "u_resolution");
      const u_textureSize = gl.getUniformLocation(program, "u_textureSize");
      const u_kernel = gl.getUniformLocation(program, "u_kernel[0]");
      const u_kernelWeight = gl.getUniformLocation(program, "u_kernelWeight");
      const kernel = kernels.triangleBlur;
      const weight = computeKernelWeight(kernel);

      // Draw rect
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const size = 2;
      const type = gl.FLOAT;
      const normalized = false;
      const stride = 0;
      const offset = 0;

      gl.vertexAttribPointer(
        positionLocation,
        size,
        type,
        normalized,
        stride,
        offset
      );

      // draw texture
      gl.enableVertexAttribArray(texcoordLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

      gl.vertexAttribPointer(
        texcoordLocation,
        size,
        type,
        normalized,
        stride,
        offset
      );

      // set position uniform
      gl.uniform2fv(u_resolution, [gl.canvas.width, gl.canvas.height]);
      // set texture uniform
      gl.uniform2fv(u_textureSize, [chaiImage.width, chaiImage.height]);
      // set kernel uniforms
      gl.uniform1fv(u_kernel, kernel);
      gl.uniform1f(u_kernelWeight, weight);

      const primitiveType = gl.TRIANGLES;
      const startOffset = 0;
      const count = 6;
      gl.drawArrays(primitiveType, startOffset, count);
    },
    []
  );

  const drawArray = useCallback((gl: GL, points: Float32Array) => {
    // const primitiveType = gl.TRIANGLES;
    // const startOffset = 0;
    // const count = points.length / 2;
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.drawArrays(primitiveType, startOffset, count);
  }, []);

  const draw = useCallback(
    (gl: GL) => {
      const points = new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
      ]);
      const program = setupGL(gl, points);

      howToDraw(gl, program, points);
      // draw
      drawArray(gl, points);
    },
    [setupGL, howToDraw, drawArray]
  );

  useEffect(() => {
    if (canvas.current) {
      const el = canvas.current as unknown as HTMLCanvasElement;
      const gl = el.getContext("webgl") as GL;
      setGL(gl);
    }
  }, [canvas]);

  useEffect(() => {
    if (gl) {
      draw(gl);
    }
  }, [gl, draw]);

  return (
    <div className="texture-container">
      <canvas ref={canvas} width="600" height="600"></canvas>
    </div>
  );
};

export default Texture;
