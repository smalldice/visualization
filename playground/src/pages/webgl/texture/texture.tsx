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

const Texture = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [gl, setGL] = useState<GL | null>(null);
  const setupGL = useCallback((gl: GL, points: Float32Array): WebGLProgram => {
    const vertex = `
    attribute vec2 texCoord;

    varying vec2 v_texCoord;

    void main() {
      gl_Position = vec4(v_texCoord, 0.0, 1.0);
      v_texCoord = texCoord;
    }
  `;

    const fragment = `
    precision mediump float;

    uniform sampler2D u_image;

    varying vec2 v_texCoord;

    void main() {
      gl_FragColor = texture2D(u_image, v_texCoord);
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
      // 设置纹理
      const texBuffer = gl.createBuffer() as WebGLBuffer;

      gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "texCoord");
      const size = 2;
      const type = gl.FLOAT;
      const normalized = false;
      const stride = 0;
      const offset = 0;

      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, size, type, normalized, stride, offset);

      const texture = gl.createTexture() as WebGLTexture;
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
    },
    []
  );

  const drawArray = useCallback((gl: GL, points: Float32Array) => {
    const primitiveType = gl.TRIANGLES;
    const startOffset = 0;
    const count = points.length / 2;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(primitiveType, startOffset, count);
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
