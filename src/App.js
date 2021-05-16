import React from "react";
import "./css/App.css";
import Game from "./pages/game";
import { Home } from "./pages/home";
import { Route, Switch } from "react-router-dom";
import { Win } from "./pages/win";

const App = () => {
  return (
    <div className="container">
      <div>
        <h1 className="welcome">Dots &amp; Boxes </h1>
        <Switch>
          <Route path="/win" exact component={Win} />
          <Route exact path="/" component={Home} />
          <Route path="/game" exact component={Game} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
