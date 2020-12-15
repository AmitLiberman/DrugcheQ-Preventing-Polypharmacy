import "./App.css";
import TopNav from "./Components/TopNav";
import ActionNav from "./Components/ActionNav";
import Home from "./Components/Home";
import InteractionChecker from "./Components/InteractionChecker";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = (props) => {
  return (
    <div className="app">
      <TopNav />
      <ActionNav />
      <Router>
        <main className="jumbotron">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/interaction-checker">
              <InteractionChecker />
            </Route>
            <Route path="/side-effect-report">
              <SideEffectReport />
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

function Topics() {
  return <h2>Topics</h2>;
}

function SideEffectReport() {
  return <h2>Side Effect Report</h2>;
}

function DrugSearch() {
  return <h2>Drug Search</h2>;
}

export default App;
