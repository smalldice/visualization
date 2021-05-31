import { useEffect, useRef } from "react";
import { withRouter } from "react-router";
import Canvas2D, { Canvas2DComp } from "../components/canvas2d";
import Vector2D from "../lib/Vector2d";

function Day1() {
  const DemoRef1 = useRef(null);
  const DemoRef2 = useRef(null);
  const DemoRef3 = useRef(null);
  const DemoRef4 = useRef(null);
  const DemoRef5 = useRef(null);
  const DemoRef6 = useRef(null);

  useEffect(() => {
    if (DemoRef1.current) {
      const renderer = DemoRef1.current as unknown as Canvas2DComp;
      renderer.getEl();
      const renderFn = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
      ) => {
        const v = new Vector2D(1, 2);
        console.log(v.x, v.y);
      };
      renderer.render(renderFn);
    }
  }, [DemoRef1]);

  return (
    <div className="container">
      <Canvas2D ref={DemoRef1}></Canvas2D>
      <Canvas2D ref={DemoRef2}></Canvas2D>
      <Canvas2D ref={DemoRef3}></Canvas2D>
      <Canvas2D ref={DemoRef4}></Canvas2D>
      <Canvas2D ref={DemoRef5}></Canvas2D>
      <Canvas2D ref={DemoRef6}></Canvas2D>
    </div>
  );
}

export default withRouter(Day1);
