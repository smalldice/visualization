import { useCallback, useEffect, useRef, useState } from "react";
import "./transform.css";
import {
  genNormalizedMatrix,
  genRotateMatrix,
  genScaleMatrix,
  genTranslateMatrix,
  matrixMultiply,
} from "./utils";

type GL = WebGLRenderingContext;

let points = [-0.9, -0.9, 0.9, -0.8, -0.1, 0.9];

const staticDraw = (gl: GL, program: WebGLProgram, m: Iterable<GLfloat>) => {
  const u_matrix = gl.getUniformLocation(program, "u_matrix");
  gl.uniformMatrix3fv(u_matrix, false, m);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
};

const TransformDemo = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [gl, setGl] = useState<WebGLRenderingContext | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [rotateDeg, setRotateDeg] = useState(0);
  const [program, setProgram] = useState<WebGLProgram | null>(null);

  const onTranslateXChange = (e: any) => {
    const val = Number(e.target.value) || 0;
    const width = (gl as GL).canvas.width;
    const height = (gl as GL).canvas.height;

    let matrix = genTranslateMatrix(val / width, translateY / height);
    matrix = matrixMultiply(matrix, genScaleMatrix(scaleX, scaleY));
    matrix = matrixMultiply(matrix, genRotateMatrix(rotateDeg));

    setTranslateX(val);
    staticDraw(gl as GL, program as WebGLProgram, matrix);
  };

  const onTranslateYChange = (e: any) => {
    const val = Number(e.target.value) || 0;
    const width = (gl as GL).canvas.width;
    const height = (gl as GL).canvas.height;

    let matrix = genTranslateMatrix(translateX / width, val / height);
    matrix = matrixMultiply(matrix, genScaleMatrix(scaleX, scaleY));
    matrix = matrixMultiply(matrix, genRotateMatrix(rotateDeg));

    setTranslateY(val);
    staticDraw(gl as GL, program as WebGLProgram, matrix);
  };

  const onScaleXChange = (e: any) => {
    const val = isNaN(Number(e.target.value)) ? 1 : Number(e.target.value);
    const width = (gl as GL).canvas.width;
    const height = (gl as GL).canvas.height;

    let matrix = genTranslateMatrix(translateX / width, translateY / height);
    matrix = matrixMultiply(matrix, genRotateMatrix(rotateDeg));
    matrix = matrixMultiply(matrix, genScaleMatrix(val, scaleY));

    setScaleX(val);
    staticDraw(gl as GL, program as WebGLProgram, matrix);
  };

  const onScaleYChange = (e: any) => {
    const val = isNaN(Number(e.target.value)) ? 1 : Number(e.target.value);
    const width = (gl as GL).canvas.width;
    const height = (gl as GL).canvas.height;

    let matrix = genTranslateMatrix(translateX / width, translateY / height);
    matrix = matrixMultiply(matrix, genRotateMatrix(rotateDeg));
    matrix = matrixMultiply(matrix, genScaleMatrix(scaleX, val));

    setScaleY(val);
    staticDraw(gl as GL, program as WebGLProgram, matrix);
  };

  const onRotateDegChange = (e: any) => {
    const val = Number(e.target.value) || 0;
    const width = (gl as GL).canvas.width;
    const height = (gl as GL).canvas.height;

    let matrix = genTranslateMatrix(translateX / width, translateY / height);
    matrix = matrixMultiply(matrix, genRotateMatrix(val));
    matrix = matrixMultiply(matrix, genScaleMatrix(scaleX, scaleY));

    setRotateDeg(val);
    staticDraw(gl as GL, program as WebGLProgram, matrix);
  };

  const setUpGL = useCallback((gl: GL) => {
    const vertex = `
      attribute vec2 position;
      uniform mat3 u_matrix;

      varying vec4 v_color;

      void main() {
        vec2 xy = (u_matrix * vec3(position, 1)).xy;
        gl_Position = vec4(xy, 0.0, 1.0);

        v_color = gl_Position * 0.5 + 0.5;
      }
    `;
    const fragment = `
      precision mediump float;

      varying vec4 v_color;
      void main() {
        gl_FragColor = v_color;
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
    setProgram(program);

    const buffer = gl.createBuffer();
    const glPoints = new Float32Array(points);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, glPoints, gl.STATIC_DRAW);

    const vPosition = gl.getAttribLocation(program, "position");
    const size = 2; // 向量表示维数， 1-4维
    const type = gl.FLOAT; // 单位数据类型是什么 有 BYTE FLOAT INT UNSIGNED_SHORT 等
    const normalized = false; //
    const stride = 0; // 表示从一个位置到下一个位置， 跳过多少位数取数据 0 表示连续的
    const offset = 0;
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, size, type, normalized, stride, offset);

    const u_matrix = gl.getUniformLocation(program, "u_matrix");
    const normalizedMatrix = genNormalizedMatrix();
    gl.uniformMatrix3fv(u_matrix, false, normalizedMatrix);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const primitiveType = gl.TRIANGLES;
    const offsetIndex = 0;
    const count = points.length / 2;
    gl.drawArrays(primitiveType, offsetIndex, count);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvas) {
      const gl = canvas.getContext("webgl");
      setGl(gl);
    }
  }, [canvas]);

  useEffect(() => {
    if (gl) {
      setUpGL(gl);
    }
  }, [gl, setUpGL]);

  return (
    <div className="transform-container">
      <canvas ref={canvasRef} width="600" height="600"></canvas>
      <div className="tool-tik">
        <div className="input-container">
          <span className="label">translateX: {translateX}</span>
          <input
            min={-100}
            max={100}
            step={0.1}
            type="range"
            name="rotateDeg"
            value={translateX}
            onChange={onTranslateXChange}
          />
        </div>
        <div className="input-container">
          <span className="label">translateY: {translateY}</span>
          <input
            min={-100}
            max={100}
            step={0.1}
            type="range"
            name="rotateDeg"
            value={translateY}
            onChange={onTranslateYChange}
          />
        </div>
        <div className="input-container">
          <span className="label">scaleX: {scaleX}</span>
          <input
            min={-2}
            max={2}
            step={0.01}
            type="range"
            name="scaleX"
            value={scaleX}
            onChange={onScaleXChange}
          />
        </div>
        <div className="input-container">
          <span className="label">scaleY: {scaleY}</span>
          <input
            min={-2}
            max={2}
            step={0.01}
            type="range"
            name="scaleY"
            value={scaleY}
            onChange={onScaleYChange}
          />
        </div>
        <div className="input-container">
          <span className="label">
            rotateDeg: {Math.round(rotateDeg * 360)}°
          </span>
          <input
            min={0}
            max={1}
            step={0.01}
            type="range"
            name="rotateDeg"
            value={rotateDeg}
            onChange={onRotateDegChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TransformDemo;
