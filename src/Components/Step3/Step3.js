import React, { Component } from "react";
import Report from "../Report/Report";

class Step3 extends Component {
  state = {
    isSymptomInsert: false,
    symptomList: [],
  };

  componentDidMount = () => {
    this.setState({ symptomList: [], isSymptomInsert: false });
  };

  symptomListUpdate = (newSymptomItem) => {
    this.setState({ symptomList: [...this.state.symptomList, newSymptomItem] });
    this.props.symptomListUpdate(newSymptomItem);
    console.log(this.state.symptomList);
  };

  symptomListDeleteItem = (id) => {
    this.setState({
      symptomList: [...this.state.symptomList.filter((drug) => drug.id !== id)],
    });
    this.props.symptomListDeleteItem(id);
    if (this.state.symptomList.length === 1)
      this.setState({ isSymptomInsert: false });
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
        <Report
          symptomInsertHandler={this.symptomInsertHandler}
          symptomListUpdate={this.symptomListUpdate}
          conditionsList={this.state.symptomList}
          symptomListDeleteItem={this.symptomListDeleteItem}
        />
      </div>
    );
  }
}

export default Step3;
