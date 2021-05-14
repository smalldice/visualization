// 3x3 矩阵相乘
// 线性代数中， a x b 是 先行后列
// GLSL中， 举证是先列后行
class Mat3Func {
  constructor() {
    this.EPSILON = 0.000001;
  }

  fromMath4(out, a) {}

  fromQuat(out, a) {}

  copy(out, a) {}

  set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;

    return out;
  }

  identity = (out) => {
    out[0] = 1;
    out[0] = 0;
    out[0] = 0;
    out[0] = 0;
    out[0] = 1;
    out[0] = 0;
    out[0] = 0;
    out[0] = 0;
    out[0] = 1;
    return out;
  };

  transpose(out, a) {}

  invert(out, a) {}

  determinant(a) {}

  multiply(out, a, b) {
    // GLSL中矩阵相乘 a x b 是先列后行
    // 计算的时候转为易于理解的 b x a 的先行后列

    let a00 = a[0],
      a01 = a[1],
      a02 = a[2];
    let a10 = a[3],
      a11 = a[4],
      a12 = a[5];
    let a20 = a[6],
      a21 = a[7],
      a22 = a[8];

    let b00 = b[0],
      b01 = b[1],
      b02 = b[2];
    let b10 = b[3],
      b11 = b[4],
      b12 = b[5];
    let b20 = b[6],
      b21 = b[7],
      b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;

    return out;
  }

  translate(out, a, v) {
    let a00 = a[0],
      a01 = a[1],
      a02 = a[2];
    let a10 = a[3],
      a11 = a[4],
      a12 = a[5];
    let a20 = a[6],
      a21 = a[7],
      a22 = a[8];
    let x = v[0],
      y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;

    return out;
  }

  rotate(out, a, rad) {
    let a00 = a[0],
      a01 = a[1],
      a02 = a[2];
    let a10 = a[3],
      a11 = a[4],
      a12 = a[5];
    let a20 = a[6],
      a21 = a[7],
      a22 = a[8];
    let s = Math.sin(rad),
      c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a21;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }

  scale(out, a, v) {
    let x = v[0],
      y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];

    return out;
  }

  add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];

    return out;
  }

  subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];

    return out;
  }

  multiplyScala(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;

    return out;
  }
}
