import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  Ref,
  useEffect,
} from "react";
import { initialCanvas } from "../lib/initCanvas2d";

interface ICanvas2DProps {
  width?: number;
  height?: number;
}

export interface Canvas2DComp
  extends React.ForwardRefExoticComponent<
    Omit<ICanvas2DProps, "type"> & React.RefAttributes<HTMLElement>
  > {
  getEl: () => HTMLCanvasElement;
  getCtx: () => CanvasRenderingContext2D;
  render: (
    fn: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
  ) => void;
}

const Canvas2D = forwardRef((p: ICanvas2DProps, ref: Ref<any>) => {
  const canvasEle = useRef<any>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [width] = useState(p.width || 600);
  const [height] = useState(p.width || 400);

  useEffect(() => {
    if (canvasEle.current) {
      const _canvas = canvasEle.current;
      const _ctx = _canvas.getContext("2d");
      const { canvas, ctx } = initialCanvas(_canvas, _ctx);
      setCanvas(canvas);
      setCtx(ctx);
    }
  }, [canvasEle]);

  useImperativeHandle(ref, () => {
    return {
      getEl: () => {
        return canvas as HTMLCanvasElement;
      },
      getContext: () => {
        return ctx as CanvasRenderingContext2D;
      },
      render: (
        fn: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {}
      ) => {
        fn(canvas as HTMLCanvasElement, ctx as CanvasRenderingContext2D);
      },
    };
  });

  return (
    <div className="canvas-container">
      <canvas width={width} height={height} ref={canvasEle}></canvas>
    </div>
  );
}) as Canvas2DComp;

export default Canvas2D;
