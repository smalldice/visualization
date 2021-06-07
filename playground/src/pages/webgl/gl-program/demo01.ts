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
      gl_FragColor = vec4(1.0, 0, 0.5, 1.0);
    }
  `;

  const points = new Float32Array([
    0, 0, 0.3, 0, 0, 0.7, 0.0, 0.7, -0.5, 0.7, -0.5, 0.0,
  ]);

  const setupGLSL = (gl: GL, program: WebGLProgram) => {
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
    // 取缓冲区数据方式
    const vPosition = gl.getAttribLocation(program, "position"); // vPosition 从什么位置开始取
    const size = 2; // 每次迭代取几个数据
    const type = gl.FLOAT; // 每个单位的数据类型是32位浮点型
    const normalize = false; // 不需要归一化数据
    const stride = 0; // 0 = 移动单位数量 *  每个单位占用的内存(sizeof(type)) 每次迭代运行运动多少内存到下一个数据开始点。
    const offset = 0; // 从缓冲起始位置开始读取

    gl.vertexAttribPointer(vPosition, size, type, normalize, stride, offset);
    gl.enableVertexAttribArray(vPosition);
  };

  const draw = (gl: GL, points: Float32Array) => {
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = points.length / 2;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
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

export default drawDemo1;
