export function genNormalizedMatrix() {
  return [1, 0, 0, 0, 1, 0, 0, 0, 1];
}

export function transport(origin: number[]) {
  const newMatrix = genNormalizedMatrix();
  newMatrix[0] = origin[0];
  newMatrix[3] = origin[1];
  newMatrix[6] = origin[2];

  newMatrix[1] = origin[3];
  newMatrix[4] = origin[4];
  newMatrix[7] = origin[5];

  newMatrix[3] = origin[6];
  newMatrix[5] = origin[7];
  newMatrix[8] = origin[8];

  return newMatrix;
}

export function genScaleMatrix(x: number, y?: number) {
  if (x === undefined) x = 1;
  if (y === undefined) y = 1;

  return [x, 0, 0, 0, y, 0, 0, 0, 1];
}

export function genRotateMatrix(rad: number) {
  if (rad === undefined) rad = 0;

  rad = rad * 2 * Math.PI;
  const c = Math.cos(rad);
  const s = Math.sin(rad);

  return [c, -s, 0, s, c, 0, 0, 0, 1];
}

export function genTranslateMatrix(x?: number, y?: number) {
  if (x === undefined) x = 0;
  if (y === undefined) y = 0;

  return [1, 0, 0, 0, 1, 0, x, y, 1];
}

// m x n
export function matrixMultiply(m: number[], n: number[]) {
  if (m === undefined) m = genNormalizedMatrix();
  if (n === undefined) n = genNormalizedMatrix();

  const m11 = m[0],
    m12 = m[1],
    m13 = m[2],
    m21 = m[3],
    m22 = m[4],
    m23 = m[5],
    m31 = m[6],
    m32 = m[7],
    m33 = m[8];

  const n11 = n[0],
    n12 = n[1],
    n13 = n[2],
    n21 = n[3],
    n22 = n[4],
    n23 = n[5],
    n31 = n[6],
    n32 = n[7],
    n33 = n[8];

  let out = genNormalizedMatrix();

  out[0] = m11 * n11 + m21 * n12 + m31 * n13;
  out[1] = m11 * n21 + m21 * n22 + m31 * n23;
  out[2] = m11 * n31 + m21 * n32 + m31 * n33;

  out[3] = m12 * n11 + m22 * n12 + m32 * n13;
  out[4] = m12 * n21 + m22 * n22 + m32 * n23;
  out[5] = m12 * n31 + m22 * n32 + m32 * n33;

  out[6] = m13 * n11 + m23 * n12 + m33 * n13;
  out[7] = m13 * n21 + m23 * n22 + m33 * n23;
  out[8] = m13 * n31 + m23 * n32 + m33 * n33;

  out = out.map((n) => {
    return Number(n.toFixed(2));
  });

  return out;
}

export function vec2LeftMultiply(v: number[], m: number[]) {
  const x = v[0];
  const y = v[1];

  return [x * m[0] + x * m[3] + x * m[6], y * m[1] + x * m[4] + x * m[7]];
}
