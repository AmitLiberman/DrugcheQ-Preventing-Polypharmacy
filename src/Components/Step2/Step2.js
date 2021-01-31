import React, { Component } from "react";
import DrugInsert from "../DrugInsert/DrugInsert";

class Step2 extends Component {
  state = {
    isDrugInsert: false,
    drugList: [],
  };
  drugListUpdate = (newDrugItem) => {
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
  };

  drugInsertHandler = (e) => {
    this.setState({ isDrugInsert: e });
  };
  render() {
    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="drug-list-report-container">
        <DrugInsert
          drugInsertHandler={this.drugInsertHandler}
          drugListUpdate={this.drugListUpdate}
        />
      </div>
    );
  }
}

export default Step2;
