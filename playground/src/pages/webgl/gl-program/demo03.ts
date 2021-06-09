import type { GL, GLProps } from "../glcanvas";

const drawDemo3 = (): GLProps => {
  const vertex = `
    attribute vec2 position;
    
    uniform vec2 u_resolution;

    void main () {
      // vec2 p = position / u_resolution * 2.0;
      vec2 p = position / u_resolution * 2.0 + u_resolution / u_resolution * vec2(-1.0, -1.0);

      gl_Position = vec4(p, 0, 1.0);
    }
  `;

  const fragment = `
    precision mediump float;

    uniform vec4 u_color;

    void main() {
      gl_FragColor = u_color;
    }
  `;

  const randomInt = (range: number): number => {
    return Math.round(Math.random() * range);
  };

  const genPoints = (
    gl: GL,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const x1 = x,
      y1 = y;
    const x2 = x + width,
      y2 = y + height;

    return new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]);
  };

  let points = new Float32Array([]);

  const setupGLSL = (gl: GL, program: WebGLProgram) => {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  };

  const draw = (
    gl: GL,
    points: Float32Array,
    program: WebGLProgram | undefined
  ) => {
    const buffer = gl.createBuffer();
    const width = gl.canvas.width / 2;
    const height = gl.canvas.height / 2;
    let glPoints = genPoints(
      gl,
      randomInt(width),
      randomInt(height),
      randomInt(width),
      randomInt(height)
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const p = program as WebGLProgram;
    const vPosition = gl.getAttribLocation(p, "position");
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(vPosition, size, type, normalize, stride, offset);
    gl.enableVertexAttribArray(vPosition);

    const uColor = gl.getUniformLocation(p, "u_color");
    const uResolution = gl.getUniformLocation(p, "u_resolution");
    gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);

    const randomDraw = () => {
      glPoints = genPoints(
        gl,
        randomInt(width),
        randomInt(height),
        randomInt(width),
        randomInt(height)
      );
      gl.bufferData(gl.ARRAY_BUFFER, glPoints, gl.STATIC_DRAW);
      gl.uniform4f(
        uColor,
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random()
      );
      gl.drawArrays(gl.TRIANGLES, 0, glPoints.length / 2);
    };

    for (let i = 0; i < 50; i++) {
      randomDraw();
    }
  };

  return {
    vertex,
    fragment,
    points,
    setupGLSL,
    draw,
  };
};
export default drawDemo3;
