import React from "react";
import { Switch, Link } from "react-router-dom";
import { routes } from "../route";

const IndexPage = () => {
  return (
    <div>
      <Switch>
        {routes
          .filter(({ path }) => {
            return path !== "/";
          })
          .map(({ path, exact, component }) => {
            return (
              <React.Fragment key={path}>
                <Link key={path} to={path}>
                  {path.substr(1)}
                </Link>
              </React.Fragment>
            );
          })}
      </Switch>
    </div>
  );
};

export default IndexPage;
