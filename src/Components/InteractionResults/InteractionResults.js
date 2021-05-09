import React, { Component } from "react";
import "./InteractionResults.css";
import { Bar, Line, Pie } from "react-chartjs-2";

class InteractionResults extends Component {
  state = {
    severit: [],
  };

  //insert severity to the relevant interaction element
  makeInteractionElement = (index, severity) => {
    return (
      <div key={index} className="drugInteractionElement">
        <h5 className="hebrew-drugs-names">
          {this.props.results[index].drug1_hebrew_name}-
          {this.props.results[index].drug2_hebrew_name}
        </h5>
        <h5>
          {this.props.results[index].drug1_name}
          <span className="generic-drug-name">
            ({this.props.results[index].drug1_generic_name})
          </span>
          -{this.props.results[index].drug2_name}
          <span className="generic-drug-name">
            ({this.props.results[index].drug2_generic_name})
          </span>
        </h5>
        <h6 className="interaction-description">
          {this.props.results[index].description}
        </h6>
        {severity}
      </div>
    );
  };

  render() {
    let results = [];
    const resultsLength = Object.keys(this.props.results).length;
    let safe_msg = "";

    if (resultsLength === 1 && this.props.results[0].comment === "safe") {
      safe_msg = (
        <h3 className="not-found-drug-msg">
          לא נמצא אינטראקציה בין התרופות שהזנת
        </h3>
      );
      results.push(safe_msg);
      return <div className="drugInteractionElement">{results}</div>;
    }

    for (let index = 0; index < resultsLength; index++) {
      let severity = "";
      if (this.props.results[index].error != null) {
        results.push(
          <div>
            <h6 className="not-found-drug-msg">לא נמצאה תרופה עם השם</h6>
            <h6>{this.props.results[index].error} </h6>
          </div>
        );
      } else if (this.props.results[index].severity != null) {
        severity = <h6 className="highSeverity">High Risk</h6>;
        results.unshift(this.makeInteractionElement(index, severity));
      } else {
        results.push(this.makeInteractionElement(index, severity));
      }
    }

    return <div>{results}</div>;
  }
}

export default InteractionResults;
