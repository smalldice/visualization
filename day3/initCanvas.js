function initCanvas(canvas, ctx) {
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1);
  drawAxis(canvas, ctx, "x");
  drawAxis(canvas, ctx, "y");
}

function drawAxis(canvas, ctx, direction = "x") {
  const { width, height } = canvas;
  const gap = 2;
  const steps = 30;
  const singleDash = (height - (steps - 1) * gap) / steps;

  const p0 =
    direction === "x"
      ? new Vector2D(...[-width / 2, 0])
      : new Vector2D(...[0, -height / 2]);

  ctx.save();
  ctx.lineWidth = "0.5px";
  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.moveTo(...p0);
  const oneStep =
    direction === "x"
      ? new Vector2D(...[singleDash, 0])
      : new Vector2D(...[0, singleDash]);
  const gapStep =
    direction === "x" ? new Vector2D(...[gap, 0]) : new Vector2D(...[0, gap]);

  let pNext = p0.copy();

  for (let i = 0; i < steps; i++) {
    pNext.add(oneStep);
    ctx.lineTo(...pNext.add(oneStep));
    pNext.add(gapStep);
    ctx.moveTo(...pNext);
  }

  ctx.stroke();
  ctx.restore();
}
