import React, { Component } from "react";
import Report from "../Report/Report";

class Step3 extends Component {
  state = {
    isSymptomInsert: false,
  };
  symptomInsertHandler = (e) => {
    this.setState({ isSymptomInsert: e });
  };
  render() {
    if (this.props.currentStep !== 3) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="sid-effect-report-container">
        <Report symptomInsertHandler={this.symptomInsertHandler} />
      </div>
    );
  }
}

export default Step3;
