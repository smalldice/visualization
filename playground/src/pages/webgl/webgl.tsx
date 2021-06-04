import { withRouter } from "react-router";
import "./webgl.css";

import GLCanvas from "./glcanvas";
import { drawDemo1 } from "./gl-program";

const WebGl = () => {
  return (
    <div className="gl-container">
      <GLCanvas {...drawDemo1()}></GLCanvas>
    </div>
  );
};

export default withRouter(WebGl);
