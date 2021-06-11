import { useCallback, useEffect, useRef, useState } from "react";
import IMAGE_CHAI from "../../images/chai.jpeg";
import "./texture.css";

type GL = WebGLRenderingContext;

const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = document.createElement("img");
    image.src = path;
    image.width = 300;
    image.height = 300;
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

  const draw = useCallback(async (gl: GL) => {
    const vertex = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      
      uniform vec2 u_resolution;
      
      varying vec2 v_texCoord;
      
      void main() {
        // convert the rectangle from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;
      
        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;
      
        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;
      
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      
        // pass the texCoord to the fragment shader
        // The GPU will interpolate this value between points.
        v_texCoord = a_texCoord;
      }
    `;

    const fragment = `
      precision mediump float;

      // our texture
      uniform sampler2D u_image;
      uniform vec2 u_textureSize;
      uniform float u_kernel[9];
      uniform float u_kernelWeight;
      
      // the texCoords passed in from the vertex shader.
      varying vec2 v_texCoord;
      
      void main() {
        vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
        vec4 colorSum =
            texture2D(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[1] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[2] +
            texture2D(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[3] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 0,  0)) * u_kernel[4] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 1,  0)) * u_kernel[5] +
            texture2D(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[6] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 0,  1)) * u_kernel[7] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 1,  1)) * u_kernel[8] ;
      
        gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1);
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

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const texcoordLocation = gl.getAttribLocation(program, "a_texCoord");
    const image = await loadImage(IMAGE_CHAI);
    const positionBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangle(gl, 0, 0, image.width, image.height);

    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const texture = gl.createTexture() as WebGLTexture;
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    // uniforms
    const u_image = gl.getUniformLocation(program, "u_image");
    console.log("image:", u_image, image);
    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_textureSize = gl.getUniformLocation(program, "u_textureSize");
    const u_kernel = gl.getUniformLocation(program, "u_kernel[0]");
    const u_kernelWeight = gl.getUniformLocation(program, "u_kernelWeight");

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    // pointer set
    const size = 2;
    const type = gl.FLOAT;
    const normalized = false;
    const stride = 0;
    const offset = 0;
    // position buffer
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(
      positionLocation,
      size,
      type,
      normalized,
      stride,
      offset
    );

    // texture buffer
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

    // set uniforms
    gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(u_textureSize, image.width, image.height);
    const kernelType = kernels.gaussianBlur3;
    gl.uniform1fv(u_kernel, kernelType);
    gl.uniform1f(u_kernelWeight, computeKernelWeight(kernelType));

    // final draw
    const primitiveType = gl.TRIANGLES;
    const startOffset = 0;
    const count = 6;
    gl.drawArrays(primitiveType, startOffset, count);
    console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
  }, []);

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
