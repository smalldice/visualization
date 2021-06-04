type GL = WebGLRenderingContext;

function setUpWhatToDraw(gl: GL): number {
  const points = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0]);

  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  let positionAttribIndex = 2;
  gl.enableVertexAttribArray(positionAttribIndex);
  gl.vertexAttribPointer(positionAttribIndex, 2, gl.FLOAT, false, 0, 0);

  return positionAttribIndex;
}

function setUpHowToDraw(gl: GL, positionAttribIndex: number) {
  const vertex = `
attribute vec2 position;

void main () {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

  const fragment = `
precision mediump float;

void main() {
  gl_FragColor = vec4(0.5, 1.0, 0.5, 1.0);
}
`;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram() as WebGLProgram;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.bindAttribLocation(program, positionAttribIndex, "position");
  gl.linkProgram(program);
  gl.useProgram(program);
}

function draw(gl: GL) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.getError();
}

export function drawHello(gl: GL) {
  const index = setUpWhatToDraw(gl);
  setUpHowToDraw(gl, index);
  draw(gl);
}
