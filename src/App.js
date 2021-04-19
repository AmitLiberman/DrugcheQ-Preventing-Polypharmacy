import "./App.css";
import TopNav from "./Constants/TopNav";
import ActionNav from "./Constants/ActionNav";
import BottomNav from "./Constants/BottomNav";
import Home from "./Constants/Home";
import InteractionChecker from "./Components/InteractionChecker/InteractionChecker";
import MasterReport from "./Components/MasterReport/MasterReport";
import NewReport from "./Components/NewReport/NewReport";

import DrugSearch from "./Components/DrugSearch/DrugSearch";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = (props) => {
  const nodeRef = React.useRef(null);

  return (
    <div className="app">
      <TopNav />
      <Router>
        <main className="component-content">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/connect">
              <Connect />
            </Route>
            <Route path="/interaction-checker">
              <InteractionChecker />
            </Route>
            <Route path="/side-effect-report">
              <MasterReport />
              {/* <NewReport /> */}
            </Route>
            <Route nodeRef={nodeRef} path="/drug-search">
              <DrugSearch ref={nodeRef} />
            </Route>
            <Route path="/">
              <ActionNav className="action-navigation-bar" />
              <Home className="home-component" />
            </Route>
          </Switch>
        </main>
      </Router>
      <BottomNav />
    </div>
  );
};

function About() {
  return <h2>About</h2>;
}

function Connect() {
  return <h1 style={{ textAlign: "right", marginBottom: "3.1em" }}>בקרוב</h1>;
}

export default App;
