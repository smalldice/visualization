import { withRouter } from "react-router";
import "./webgl.css";

import GLCanvas from "./glcanvas";
import TransformGL from "./transform/transform";
import Texture from "./texture/texture";
import Texture2 from "./texture/texture2";
import Texture3 from "./texture/texture3";
import Texture4 from "./texture/texture4";

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
      <Texture></Texture>
      <Texture2></Texture2>
      <Texture3></Texture3>
      <Texture4></Texture4>
    </div>
  );
};

export default withRouter(WebGl);
