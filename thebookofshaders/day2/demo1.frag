#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st) {
  return smoothstep(1.0, -1.0, abs(sin(st.x)));
}

void main() {
  vec2 st= gl_FragCoord.xy / u_resolution;

  vec3 color = vec3(plot(st));

  gl_FragColor = vec4(color, 1.0);
}