import React, { Component } from "react";
import DrugInsert from "../DrugInsert/DrugInsert";

class Step2 extends Component {
  state = {
    drugList: [],
  };
  drugListUpdate = (newDrugItem) => {
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
    console.log(this.state.drugList);
  };

  render() {
    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="drug-list-report-container">
        <DrugInsert
          drugListUpdate={this.drugListUpdate}
          drugList={this.state.drugList}
        />
      </div>
    );
  }
}

export default Step2;
