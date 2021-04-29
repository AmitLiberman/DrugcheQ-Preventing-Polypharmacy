import React, { Component } from "react";
import DrugInsert from "../DrugInsert/DrugInsert";
import RemedyInsert from "../RemedyInsert/RemedyInsert";

class Step2 extends Component {
  render() {
    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return null;
    }

    return (
      <div className="drug-list-report-container">
        {/* <DrugInsert
          drugListUpdate={this.drugListUpdate}
          drugList={this.state.drugList}
          delDrug={this.drugListDeleteItem}
        /> */}
        <RemedyInsert
          drugInserted={this.props.drugInserted}
          drugListUpdate={this.props.drugListUpdate}
          drugListDeleteItem={this.props.drugListDeleteItem}
          onNext={this.props.onNext}
        />
      </div>
    );
  }
}

export default Step2;
