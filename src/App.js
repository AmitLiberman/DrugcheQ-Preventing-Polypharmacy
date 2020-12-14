import "./App.css";
import TopNav from "./Components/TopNav";
import ActionNav from "./Components/ActionNav";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = (props) => {
  return (
    <div>
      <TopNav />
      <ActionNav />
      <Router>
        <div>
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
        </div>
      </Router>
    </div>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  return <h2>Topics</h2>;
}

function InteractionChecker() {
  return <h2>Interaction Checker</h2>;
}

function SideEffectReport() {
  return <h2>Side Effect Report</h2>;
}

function DrugSearch() {
  return <h2>Drug Search</h2>;
}

export default App;
