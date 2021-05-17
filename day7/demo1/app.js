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

function drawDemo3() {
  const canvas = document.getElementById("demo3");
  const ctx = canvas.getContext("2d");

  initCanvas(canvas, ctx);

  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `hsl(${Math.floor(i * 15)}, 50%, 50%)`;
    ctx.beginPath();
    ctx.arc((i - 10) * 20, 60, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `hsl(${Math.floor(i % 2 ? 60 : 210) + 3 * i}, 50%, 50%)`;
    ctx.beginPath();
    ctx.arc((i - 10) * 20, -60, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDemo4() {
  const canvas = document.getElementById("demo4");
  const ctx = canvas.getContext("2d");

  initCanvas(canvas, ctx);

  for (let i = 0; i < 20; i++) {
    let { r, g, b } = d3.lab(30, i * 15 - 150, i * 15 - 150).rgb();

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.beginPath();
    ctx.arc((i - 10) * 20, 60, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 20; i++) {
    const c = d3.lab(i * 5, 80, 80).rgb();
    ctx.fillStyle = `rgb(${Math.floor(c.r)},${Math.floor(c.g)},${Math.floor(
      c.b
    )})`;
    ctx.beginPath();
    ctx.arc((i - 10) * 20, -60, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDemo5() {
  const canvas = document.getElementById("demo5");
  const ctx = canvas.getContext("2d");

  ctx.translate(0, canvas.height / 2);
  ctx.scale(1, -1);

  const color = window.cubehelix();
  const T = 2000;

  const update = (t) => {
    const now = Date.now();
    const p = 0.5 + 0.5 * Math.sin(t / T);
    ctx.clearRect(0, -canvas.height / 2, canvas.width, canvas.height);

    let { r, g, b } = color(p);
    r = 255 * r[0];
    g = 255 * g[0];
    b = 255 * b[0];

    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.beginPath();
    p0 = [20, -20];
    p1 = [480 * p, 40];
    ctx.rect(...p0, ...p1);
    ctx.fill();

    window.requestAnimationFrame(update);
  };

  update(0);
}

drawDemo1();
drawDemo2();
drawDemo3();
drawDemo4();
drawDemo5();
