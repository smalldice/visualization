class Mat3fun {
  multiply(out = this.normalizedMat3(), a, b) {
    const a11 = a[0];
    const a12 = a[1];
    const a13 = a[2];
    const a21 = a[3];
    const a22 = a[4];
    const a23 = a[5];
    const a31 = a[6];
    const a32 = a[7];
    const a33 = a[8];

    const b11 = b[0];
    const b12 = b[1];
    const b13 = b[2];
    const b21 = b[3];
    const b22 = b[4];
    const b23 = b[5];
    const b31 = b[6];
    const b32 = b[7];
    const b33 = b[8];

    out[0] = a11 * b11 + a12 * b21 + a13 * b31;
    out[1] = a11 * b12 + a12 * b22 + a13 * b32;
    out[2] = a11 * b13 + a12 * b23 + a13 * b33;

    out[3] = a21 * b11 + a22 * b21 + a23 * b31;
    out[4] = a21 * b12 + a22 * b22 + a23 * b32;
    out[5] = a21 * b13 + a22 * b23 + a23 * b33;

    out[6] = a31 * b11 + a32 * b21 + a33 * b31;
    out[7] = a31 * b12 + a32 * b22 + a33 * b32;
    out[8] = a31 * b13 + a32 * b23 + a33 * b33;

    return out;
  }

  multiplyV3D(out = this.normalizedV3D(), m, v) {
    const m11 = a[0];
    const m12 = a[1];
    const m13 = a[2];
    const m21 = a[3];
    const m22 = a[4];
    const m23 = a[5];
    const m31 = a[6];
    const m32 = a[7];
    const m33 = a[8];

    const x = v[0];
    const y = v[1];
    const z = v[2];

    out[0] = x * m11 + y * m21 + z * m31;
    out[1] = x * m12 + y * m22 + z * m32;
    out[2] = x * m13 + y * m23 + z * m33;

    return out;
  }

  normalizedMat3() {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  normalizedV3d() {
    return [1, 1, 1];
  }
}

function genRotateMat3(rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [c, -s, 0, s, c, 0, 0, 0, 1];
}

function genScaleMat3(sx, sy) {
  if (sy === undefined) {
    sy = sx;
  }

  return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
}

function genTranslateMat3(x, y) {
  return [1, 0, x, 0, 1, y, 0, 0, 1];
}
