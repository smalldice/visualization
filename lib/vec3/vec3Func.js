const EPSILON = 0.000001;

class Vec3Func {
  length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];

    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }

  set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }

  add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }

  sub(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }

  multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }

  divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }

  scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }

  distance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];

    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  squaredDistance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];

    return x ** 2 + y ** 2 + z ** 2;
  }

  squaredLength(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];

    return x ** 2 + y ** 2 + z ** 2;
  }

  negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];

    return out;
  }

  inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];

    return out;
  }

  normalize(out, a) {
    let len = this.squaredLength(a);

    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;

    return out;
  }

  dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  cross(out, a, b) {
    let ax = a[0],
      ay = a[1],
      az = a[2];
    let bx = b[0],
      by = b[1],
      bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }

  lerp(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];

    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);

    return out;
  }

  transformMat4(out, a, m) {}

  transformMat3(out, a, m) {}

  transformQuat(out, a, q) {}

  angle() {}

  exactEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z;
  }
}
