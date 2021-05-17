function randomColor(
  x = 0.5 * Math.random(),
  y = 0.5 * Math.random(),
  z = 0.5 * Math.random()
) {
  return new Vec3(x, y, z);
}

function drawDemo1() {
  const canvas = document.getElementById("demo1");
  const ctx = canvas.getContext("2d");

  window.initCanvas(canvas, ctx);

  for (let i = 0; i < 3; i++) {
    const colorVector = randomColor();
    for (let j = 0; j < 5; j++) {
      const c = colorVector.clone().scale(0.5 + 0.25 * j);
      ctx.fillStyle = `rgb(${Math.floor(c.x * 256)},${Math.floor(
        c.y * 256
      )},${Math.floor(c.z * 256)})`;
      ctx.beginPath();
      ctx.arc((j - 2) * 60, (i - 1) * 60, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawDemo2() {
  const canvas = document.getElementById("demo2");
  const ctx = canvas.getContext("2d");
  initCanvas(canvas, ctx);

  const [h, s, l] = randomColor(
    Math.random() * 0.5, // 色相0 - 0.5 随机
    0.7, // 饱和度
    0.45 // 初始亮度
  );

  for (let i = 0; i < 3; i++) {
    const p = (i * 0.25 + h) % 1;

    for (let j = 0; j < 5; j++) {
      const d = j - 2;
      ctx.fillStyle = `hsl(${Math.floor(p * 360)}, ${Math.floor(
        (0.15 * d + s) * 100
      )}%, ${Math.floor((0.12 * d + l) * 100)}%)`;
      ctx.beginPath();
      ctx.arc((j - 2) * 60, (i - 1) * 60, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

drawDemo1();
drawDemo2();
