function initCanvas(id) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1);

  drawAxises(canvas, ctx);

  return {
    canvas,
    ctx,
  };
}

function drawAxises(canvas, ctx) {
  const step = 20;
  const gap = 4;
  const xWidth = (canvas.width - gap * (step - 1)) / step;
  const yWidth = (canvas.height - gap * (step - 1)) / step;

  // draw x axis
  const initialX = -canvas.width / 2;
  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
  ctx.beginPath();

  for (let i = 0; i < step; i++) {
    const startX = initialX + i * (xWidth + gap);
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX + xWidth, 0);
  }
  ctx.stroke();

  // draw y axis
  const initialY = -canvas.height / 2;
  for (let i = 0; i < step; i++) {
    const startY = initialY + i * (yWidth + gap);
    ctx.moveTo(0, startY);
    ctx.lineTo(0, startY + yWidth);
  }
  ctx.stroke();
  ctx.restore();
}
