import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { routes } from "./route";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map(({ path, exact = false, component }) => {
            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                component={component}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
