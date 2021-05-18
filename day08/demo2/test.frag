#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
uniform vec2 u_resolution;
uniform int rows;

float random(vec2 _st) {
  return fract(
    sin(
      dot(
        _st.xy, vec2(12.9898, 78.233)
      )
    ) * 43758.5453123
  );
}

vec2 truchetPattern(vec2 _st, float _index) {
  _index = fract((_index - 0.5) * 2.0);

  if (_index > 0.75) {
    _st = vec2(1.0) - _st;
  } else if(_index > 0.5) {
    _st = vec2(1.0 - _st.x, _st.y);
  } else if(_index > 0.25) {
    _st = vec2(1.0) - vec2(1.0 - _st.x, _st.y);
  }

  return _st;
}

void main() {
  int rows = 64;
  // vec2 st = vUv * float(rows);
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec2 ipos = floor(st);
  vec2 fpos = fract(st);
  vec2 tile = truchetPattern(fpos, random(ipos));
  float color = 0.0;

  color = smoothstep(tile.x - 0.3, tile.x, tile.y) - smoothstep(tile.x, tile.x + 0.3, tile.y);

  gl_FragColor.rgb = vec3(color);
  gl_FragColor.a = 1.0;
}