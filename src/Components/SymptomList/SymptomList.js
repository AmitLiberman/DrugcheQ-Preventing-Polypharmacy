import React, { Component } from "react";
import SymptomContainer from "../SymptomContainer/SymptomContainer";

class SymptomList extends Component {
  render() {
    return this.props.symptomItems.map((item, i) => (
      <SymptomContainer
        symptomItem={item}
        chooseSuggestChange={this.props.chooseSuggestChange}
        onClickDelete={this.props.onClickDelete}
        getSymptomValue={this.props.getSymptomValue}
        getSymptomSeverity={this.props.getSymptomSeverity}
        getSymptomAppearDate={this.props.getSymptomAppearDate}
      />
    ));
  }
}

export default SymptomList;
