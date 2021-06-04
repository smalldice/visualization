class Vector2D extends Array {
  constructor(x: number, y: number) {
    // @ts-ignore
    super(x, y);
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  get dir() {
    return Math.atan2(this.x, this.y);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  add(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  rotate(rad: number) {
    const c = Math.cos(rad);
    const s = Math.sin(rad);

    this.x = c * this.x - s * this.y;
    this.y = c * this.y + c * this.x;

    return this;
  }

  scale(v: number) {
    this.x = this.x * v;
    this.y = this.y * v;
    return this;
  }

  cross(v: Vector2D) {
    return this.x * v.y - v.x * this.y;
  }

  len() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  dot(v: Vector2D) {
    this.x = this.x * v.x;
    this.y = this.y * v.y;
    return this;
  }
}

export default Vector2D;
