export const initialCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} => {
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1);
  return {
    canvas,
    ctx,
  };
};
