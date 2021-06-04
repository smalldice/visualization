import { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import { drawHello } from "./render";
import "./webgl.css";

const WebGl = () => {
  const el = useRef(null);
  const [gl, setGL] = useState<WebGLRenderingContext | null>(null);

  useEffect(() => {
    if (gl !== null) {
      drawHello(gl);
      console.log(gl.getParameter(gl.VERSION));
    }
  }, [gl]);
  useEffect(() => {
    if (el.current) {
      const canvas = el.current as unknown as HTMLCanvasElement;
      const gl = canvas.getContext("webgl");
      setGL(gl);
    }
  }, [el]);

  return (
    <div className="gl-container">
      <canvas ref={el} width="600" height="600"></canvas>
    </div>
  );
};

export default withRouter(WebGl);
