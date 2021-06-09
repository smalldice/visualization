import { useCallback, useEffect, useRef, useState } from "react";
import "./texture.css";

type GL = WebGLRenderingContext;

const Texture = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [gl, setGL] = useState<GL | null>(null);
  const setupGL = useCallback((gl: GL, points: Float32Array): WebGLProgram => {
    const vertex = `
    attribute vec4 position;

    uniform vec4 u_offset;

    varying vec4 v_positionWithOffset;

    void main() {
      gl_Position = position + u_offset;
      v_positionWithOffset = position + u_offset;
    }
  `;

    const fragment = `
    precision mediump float;

    uniform sampler2D u_texture;
    varying vec4 v_positionWithOffset;

    void main() {
      vec4 color = v_positionWithOffset * 0.5 + 0.9;
      vec2 texcoord = vec2(0.5, 0.5);
      gl_FragColor = color;
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

  const howToDraw = useCallback((gl: GL, program: WebGLProgram) => {
    // 告诉gl程序如何取 顶点 缓冲数据
    const vPosition = gl.getAttribLocation(program, "position");
    const size = 2;
    const type = gl.FLOAT;
    const normalized = false;
    const stride = 0;
    const pointOffset = 0;

    gl.vertexAttribPointer(
      vPosition,
      size,
      type,
      normalized,
      stride,
      pointOffset
    );
    gl.enableVertexAttribArray(vPosition);

    // 设置其他变量
    const u_offset = gl.getUniformLocation(program, "u_offset");
    gl.uniform4f(u_offset, -0.5, 0, 0, 0);

    // 设置纹理
    const texture = gl.createTexture() as WebGLTexture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const level = 0;
    const width = 2;
    const height = 1;
    const data = new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255]);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      data
    );

    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    const u_texture = gl.getUniformLocation(program, "u_texture");
    const uint = 5;
    gl.uniform1i(u_texture, uint);
    gl.activeTexture(gl.TEXTURE0 + uint);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  }, []);

  const drawArray = useCallback((gl: GL, points: Float32Array) => {
    const primitiveType = gl.TRIANGLES;
    const startOffset = 0;
    const count = points.length / 2;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(primitiveType, startOffset, count);
  }, []);

  const draw = useCallback(
    (gl: GL) => {
      const points = new Float32Array([-0.5, -0.5, 0.6, -0.6, 0, 0.8]);
      const program = setupGL(gl, points);

      howToDraw(gl, program);
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
