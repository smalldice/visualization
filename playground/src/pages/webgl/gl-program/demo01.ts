import type { GLProps, GL } from "../glcanvas";

const drawDemo1 = (): GLProps => {
  const vertex = `
    attribute vec2 position;

    void main () {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragment = `
    precision mediump float;

    void main () {
      gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0);
    }
  `;

  const points = new Float32Array([0, 0, 1.0, 0, 0, 1.0]);

  const setupGLSL = (gl: GL, program: WebGLProgram) => {
    const vPosition = gl.getAttribLocation(program, "position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
  };

  return {
    vertex,
    fragment,
    points,
    setupGLSL,
  };
};

export default drawDemo1;
