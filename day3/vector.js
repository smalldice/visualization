class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    super(x, y);
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  set x(val) {
    this[0] = val;
  }

  set y(val) {
    this[1] = val;
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  rotate(rad = 0) {
    const c = Math.cos(rad);
    const s = Math.sin(rad);

    const [x, y] = this;
    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }

  scale(length = 1) {
    this.x = this.x * length;
    this.y = this.y * length;

    return this;
  }

  add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;

    return this;
  }

  // 表示向量 [x,y] 相对于 x 轴的角度， 取值在 -PI 和 PI 之间
  dir() {
    return Math.atan2(this.y, this.x);
  }

  len() {
    return Math.pow(this.x * this.x + this.y * this.y, 0.5);
  }
}
