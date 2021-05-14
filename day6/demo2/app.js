const mat3 = new Mat3();
const canvas = document.getElementById("demo1");
const gl = canvas.getContext("webgl");

const vertex = `
  attribute vec2 position;

  uniform float u_rotation;
  uniform float u_time;
  uniform float u_duration;
  uniform float u_scale;
  uniform vec2 u_dir;

  varying float vP;

  void main() {
    float p = min(1.0, u_time / u_duration);
    float rad = u_rotation + 3.14 * 10.0 * p;
    float scale = u_scale * p * (2.0 - p);
    vec2 offset = 2.0 * u_dir * p * p;
    mat3 translateMatrix = mat3(
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      offset.x, offset.y, 1.0
    );
    mat3 rotateMatrix = mat3(
      cos(rad), sin(rad), 0.0,
      -sin(rad), cos(rad), 0.0,
      0.0, 0.0, 1.0
    );
    mat3 scaleMatrix = mat3(
      scale, 0.0, 0.0,
      0.0, scale, 0.0,
      0.0, 0.0, 1.0
    );
    gl_PointSize = 1.0;
    vec3 pos = translateMatrix * rotateMatrix * scaleMatrix * vec3(position, 1.0);
    gl_Position = vec4(pos, 1.0);
    vP = p;
  }
`;

const fragment = `
  precision mediump float;
  uniform vec4 u_color;
  varying float vP;

  void main()
  {
    gl_FragColor.xyz = u_color.xyz;
    gl_FragColor.a = (1.0 - vP) * u_color.a;
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const positions = new Float32Array([-1, -1, 0, 1, 1, -1]);

const bufferID = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const vPosition = gl.getAttribLocation(program, "position");
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

let triangles = [];

function update() {
  for (let i = 0; i < 5 * Math.random(); i++) {
    triangles.push(randomTriangle());
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  triangles.forEach((triangle) => {
    triangle.u_time = (performance.now() - triangle.startTime) / 1000;
    setUniform(gl, triangle);
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
  });

  triangles = triangles.filter((triangle) => {
    return triangle.u_time <= triangle.u_duration;
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

function randomTriangle() {
  const u_color = [Math.random(), Math.random(), Math.random(), 1.0];
  const u_rotation = Math.random() * Math.PI;
  const u_scale = Math.random() * 0.05 + 0.03;
  const u_time = 0;
  const u_duration = 3.0;
  const rad = Math.random() * Math.PI * 2;
  const u_dir = [Math.cos(rad), Math.sin(rad)]; // 运动方向
  const startTime = performance.now();

  return { u_color, u_rotation, u_scale, u_time, u_duration, u_dir, startTime };
}

function setUniform(
  gl,
  { u_color, u_rotation, u_scale, u_time, u_duration, u_dir }
) {
  let loc = gl.getUniformLocation(program, "u_color");
  gl.uniform4fv(loc, u_color);

  loc = gl.getUniformLocation(program, "u_rotation");
  gl.uniform1f(loc, u_rotation);

  loc = gl.getUniformLocation(program, "u_scale");
  gl.uniform1f(loc, u_scale);

  loc = gl.getUniformLocation(program, "u_time");
  gl.uniform1f(loc, u_time);

  loc = gl.getUniformLocation(program, "u_duration");
  gl.uniform1f(loc, u_duration);

  loc = gl.getUniformLocation(program, "u_dir");
  gl.uniform2fv(loc, u_dir);
}
