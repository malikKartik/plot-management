import Home from "./containers/home/Home";
import Colony from "./containers/colony/Colony";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/colony/:id">
          <Colony></Colony>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
