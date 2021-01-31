import "./App.css";
import TopNav from "./Constants/TopNav";
import ActionNav from "./Constants/ActionNav";
import Home from "./Constants/Home";
import InteractionChecker from "./Components/InteractionChecker/InteractionChecker";
import MasterReport from "./Components/MasterReport/MasterReport";
import DrugSearch from "./Components/DrugSearch/DrugSearch";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = (props) => {
  return (
    <div className="app">
      <TopNav />
      <ActionNav />
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
            </Route>
            <Route path="/drug-search">
              <DrugSearch />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

function About() {
  return <h2>About</h2>;
}

function Connect() {
  return <h2>connect</h2>;
}

export default App;
