#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float x = st.x * 10.0;
  float y = sin(x);
  vec3 color = vec3(0.0, step(3.0, abs(st.y - abs(y))), 0.0) + vec3(0.0);
  gl_FragColor = vec4(color, 1.0);
}