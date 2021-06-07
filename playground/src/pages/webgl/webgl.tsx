import { withRouter } from "react-router";
import "./webgl.css";

import GLCanvas from "./glcanvas";
import TransformGL from "./transform/transform";

import {
  drawDemo1,
  drawDemo2,
  drawDemo3,
  drawDemo4,
  drawDemo5,
} from "./gl-program";
const WebGl = () => {
  return (
    <div className="gl-container">
      <GLCanvas {...drawDemo1()}></GLCanvas>
      <GLCanvas {...drawDemo2()}></GLCanvas>
      <GLCanvas {...drawDemo3()}></GLCanvas>
      <GLCanvas {...drawDemo4()}></GLCanvas>
      <GLCanvas {...drawDemo5()}></GLCanvas>
      <TransformGL></TransformGL>
    </div>
  );
};

export default withRouter(WebGl);
