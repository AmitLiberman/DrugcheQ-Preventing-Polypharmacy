import React, { Component } from "react";
import DrugInsert from "../DrugInsert/DrugInsert";

class Step2 extends Component {
  state = {
    drugList: [],
  };
  drugListUpdate = (newDrugItem) => {
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
  };

  render() {
    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="drug-list-report-container">
        <DrugInsert drugListUpdate={this.drugListUpdate} />
      </div>
    );
  }
}

export default Step2;
