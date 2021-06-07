import type { GL, GLProps } from "../glcanvas";

const drawDemo5 = (): GLProps => {
  const vertex = `
    attribute vec2 position;

    varying vec4 v_color;

    void main () {
      gl_Position = vec4(position, 0.0, 1.0);
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

  const points = new Float32Array([-0.9, -0.9, 0.9, -0.8, -0.1, 0.9]);

  const setupGLSL = (gl: GL, program: WebGLProgram) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const vPosition = gl.getAttribLocation(program, "position");
    const size = 2;
    const type = gl.FLOAT;
    const normalized = false;
    const stride = 0;
    const offset = 0;
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, size, type, normalized, stride, offset);
  };

  const draw = (gl: GL, points: Float32Array, program?: WebGLProgram) => {
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = points.length / 2;
    gl.drawArrays(primitiveType, offset, count);
  };

  return {
    vertex,
    fragment,
    points,
    setupGLSL,
    draw,
  };
};

export default drawDemo5;
