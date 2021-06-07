import { useCallback, useEffect, useRef, useState } from "react";
import "./transform.css";
import {
  genNormalizedMatrix,
  genRotateMatrix,
  genScaleMatrix,
  vec2LeftMultiply,
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
  const [rangeX, setRangeX] = useState(1);
  const [rangeY, setRangeY] = useState(1);
  const [rotateDeg, setRotateDeg] = useState(0);
  const [program, setProgram] = useState<WebGLProgram | null>(null);

  const onRangeXChange = (e: any) => {
    const val = e.target.value;
    setRangeX(val);

    const matrix = genScaleMatrix(Number(val));

    staticDraw(gl as GL, program as WebGLProgram, matrix);
  };

  const onRangeYChange = (e: any) => {
    const val = e.target.value;
    setRangeY(val);

    const matrix = genScaleMatrix(1, Number(val));

    staticDraw(gl as GL, program as WebGLProgram, matrix);
  };

  const onRotateDegChange = (e: any) => {
    const val = Number(e.target.value);
    setRotateDeg(val);
    const matrix = genRotateMatrix(val * 2 * Math.PI);
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

    console.log("VERTEX SHADER: ", gl.getShaderInfoLog(vertexShader));
    console.log("FRAGMENT SHADER: ", gl.getShaderInfoLog(fragmentShader));

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
    const size = 2;
    const type = gl.FLOAT;
    const normalized = false;
    const stride = 0;
    const offset = 0;
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, size, type, normalized, stride, offset);

    const u_matrix = gl.getUniformLocation(program, "u_matrix");
    const normalizedMatrix = genNormalizedMatrix();
    gl.uniformMatrix3fv(u_matrix, false, normalizedMatrix);
    gl.clear(gl.COLOR_BUFFER_BIT);
    console.log(gl.getProgramInfoLog(program));

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
          <span className="label">scaleX: {rangeX}</span>
          <input
            min={-2}
            max={2}
            step={0.1}
            type="range"
            name="scaleX"
            value={rangeX}
            onChange={onRangeXChange}
          />
        </div>
        <div className="input-container">
          <span className="label">scaleY: {rangeY}</span>
          <input
            min={-2}
            max={2}
            step={0.1}
            type="range"
            name="scaleY"
            value={rangeY}
            onChange={onRangeYChange}
          />
        </div>
        <div className="input-container">
          <span className="label">rotateDeg: {rotateDeg}</span>
          <input
            min={0}
            max={1}
            step={0.05}
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
