// 使用webgl绘制重复图形

// webgl api 由gl-render.js 提供的api代理
function drawDemo2() {
  const canvas = document.getElementById("demo2");
  const renderer = new GlRenderer(canvas);

  const vertex = `
  attribute vec2 a_vertexPosition;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    gl_PointSize = 1.0;
    vUv = uv;
    gl_Position = vec4(a_vertexPosition, 1, 1);
  }
`;

  // fract(vUv * rows) 取结果的小数部分， glsl中用来生成噪音
  // step ， webgl中， 片元(fragment)着色器是连续的线性插值， 如果想让其阶梯性插值， 则使用step函数
  // step(a, b) 如果 b < a return = 0, b >= a return = 1
  // mix 是线性插值函数， mix(a,b,c) c = 0 返回 a c = 1 返回 b

  const fragment = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  varying vec2 vUv;
  uniform float rows;

  void main() {
    vec2 st = fract(vUv * rows);
    float d1 = step(st.x, 0.9);
    float d2 = step(0.1, st.y);
    gl_FragColor.rgb = mix(vec3(0.8), vec3(1.0), d1 * d2);
    gl_FragColor.a = 1.0;
  }
`;

  const program = renderer.compileSync(fragment, vertex);
  renderer.useProgram(program);

  renderer.uniforms.rows = 32;
  // const rows = [1, 4, 16, 32, 64];

  // let idx = 0;
  // const timerId = setInterval(() => {
  //   renderer.uniforms.rows = rows[idx++];

  //   if (idx > 4) {
  //     clearInterval(timerId);
  //   }
  // }, 1000);

  renderer.setMeshData([
    {
      positions: [
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ],
      attributes: {
        // 纹理坐标
        uv: [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      },
      cells: [
        [0, 1, 2],
        [2, 0, 3],
      ],
    },
  ]);

  renderer.render();
}

drawDemo2();
