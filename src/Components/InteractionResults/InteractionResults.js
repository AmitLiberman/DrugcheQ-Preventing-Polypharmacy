import React, { Component } from "react";
import "./InteractionResults.css";

class InteractionResults extends Component {
  render() {
    let results = [];
    const resultsLength = Object.keys(this.props.results).length;
    for (let index = 0; index < resultsLength; index++) {
      let severit = "";

      if (this.props.results[index].severity != null) {
        severit = <h6 className="highSeverity">High Risk</h6>;
      }
      results.push(
        <div className="drugInteractionElement">
          <h3>
            {this.props.results[index].drug1} -{this.props.results[index].drug2}
          </h3>
          <h6>{this.props.results[index].description}</h6>
          {severit}
        </div>
      );
    }

    return <div>{results}</div>;
  }
}

export default InteractionResults;
