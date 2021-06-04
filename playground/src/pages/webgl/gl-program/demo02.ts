import type { GLProps, GL } from "../glcanvas";

const drawDemo2 = (): GLProps => {
  const vertex = `
    attribute vec2 position;
    
    uniform vec2 u_resolution;

    void main () {
      vec2 zeroToOne = position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;

      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1.0);
    }
  `;

  const fragment = `
    precision mediump float;

    void main () {
      gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
    }
  `;

  const points = new Float32Array([
    10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30,
  ]);

  const setupGLSL = (gl: GL, program: WebGLProgram) => {
    const vPosition = gl.getAttribLocation(program, "position");
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(vPosition, size, type, normalize, stride, offset);
    gl.enableVertexAttribArray(vPosition);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);
  };

  const draw = (gl: GL, points: Float32Array) => {
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

export default drawDemo2;
