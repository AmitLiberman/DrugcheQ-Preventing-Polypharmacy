import React, { Component } from "react";
import DrugInsert from "../DrugInsert/DrugInsert";
import RemedyInsert from "../RemedyInsert/RemedyInsert";

class Step2 extends Component {
  state = {
    drugList: [],
  };

  drugListUpdate = (newDrugItem) => {
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
    this.props.drugListUpdate(newDrugItem);
    this.props.drugInserted(true);
  };

  drugListDeleteItem = (id) => {
    this.setState({
      drugList: [...this.state.drugList.filter((drug) => drug.id !== id)],
    });
    this.props.drugListDeleteItem(id);
    if (this.state.drugList.length === 1) this.props.drugInserted(false);
  };

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
        <RemedyInsert />
      </div>
    );
  }
}

export default Step2;
