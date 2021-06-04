import { withRouter } from "react-router";
import "./webgl.css";

import GLCanvas from "./glcanvas";
import { drawDemo1, drawDemo2 } from "./gl-program";
const WebGl = () => {
  return (
    <div className="gl-container">
      <GLCanvas {...drawDemo1()}></GLCanvas>
      <GLCanvas {...drawDemo2()}></GLCanvas>
    </div>
  );
};

export default withRouter(WebGl);
