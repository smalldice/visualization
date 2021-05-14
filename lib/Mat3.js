const m3 = new Mat3Func();

class Mat3 extends Array {
  constructor(
    m00 = 1,
    m01 = 0,
    m02 = 0,
    m10 = 0,
    m11 = 1,
    m12 = 0,
    m20 = 0,
    m21 = 0,
    m22 = 0
  ) {
    super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return this;
  }

  set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    if (m00.length) return this.copy(m00);

    m3.set(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return this;
  }

  translate(v, m = this) {
    m3.translate(this, m, v);
    return this;
  }

  rotate(v, m = this) {
    m3.rotate(this, m, v);

    return this;
  }

  scale(v, m = this) {
    m3.scale(this, m, v);

    return this;
  }

  multiply(ma, mb) {
    if (mb) {
      m3.multiply(this, ma, mb);
    } else {
      m3.multiply(this, this, ma);
    }

    return this;
  }

  identity() {
    m3.identity(this);
    return this;
  }

  copy(m) {
    m3.copy(this, m);
    return this;
  }

  fromMatrix4(m) {
    m3.fromMatrix4(this, m);

    return this;
  }

  fromQuaternion(q) {
    m3.fromQuat(this, q);

    return this;
  }

  fromBasis(vec3a, vec3b, vec3c) {
    this.set(
      vec3a[0],
      vec3a[1],
      vec3a[2],

      vec3b[0],
      vec3b[1],
      vec3b[2],

      vec3c[0],
      vec3c[1],
      vec3c[2]
    );

    return this;
  }

  invert(m = this) {
    m3.invert(this, m);
    return this;
  }

  getNormalMatrix(m) {
    m3.normalFromMat4(this, m);
    return this;
  }
}
