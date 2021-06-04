import { useCallback, useEffect, useRef, useState } from "react";

export type GL = WebGLRenderingContext;

export interface GLProps {
  vertex: string;
  fragment: string;
  points: Float32Array;
  setupGLSL: (gl: GL, program: WebGLProgram, params?: any) => void;
  draw?: (gl: GL) => void;
}
const setUpShader = (gl: GL, type: GLenum, source: string): WebGLShader => {
  const shader = gl.createShader(type) as WebGLShader;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  return shader;
};

const setUpGL = (gl: GL, { points, vertex, fragment, setupGLSL }: GLProps) => {
  // shader初始化
  const vertexShader = setUpShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = setUpShader(gl, gl.FRAGMENT_SHADER, fragment);

  // program初始化
  const program = gl.createProgram() as WebGLProgram;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  // 缓冲区初始化
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  // 用户定义的， 根据GLSL 程序设置变量的过程
  setupGLSL(gl, program);
};

const GLCanvas = (props: GLProps) => {
  const el = useRef(null);
  const [gl, setGl] = useState<GL | null>(null);

  const drawCtx = useCallback(() => {
    if (gl) {
      const { vertex, fragment, points, setupGLSL, draw } = props;
      // 数据设置
      setUpGL(gl, {
        vertex,
        fragment,
        points,
        setupGLSL,
      });

      // 用户定义的绘制方法
      if (draw) {
        draw(gl);
      } else {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, props.points.length / 2);
      }
    }
  }, [gl, props]);

  useEffect(() => {
    if (el.current) {
      const canvas = el.current as unknown as HTMLCanvasElement;
      const gl = canvas.getContext("webgl") as GL;
      setGl(gl);
    }
  }, [el]);

  useEffect(() => {
    if (gl) {
      drawCtx();
    }
  }, [gl, drawCtx]);

  return <canvas ref={el} width="600" height="600"></canvas>;
};

export default GLCanvas;
