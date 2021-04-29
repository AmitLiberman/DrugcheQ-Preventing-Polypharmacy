import React, { Component } from "react";
import SymptomContainer from "../SymptomContainer/SymptomContainer";

class SymptomList extends Component {
  render() {
    return this.props.symptomItems.map((item) => (
      <SymptomContainer
        key={item.id}
        symptomItem={item}
        chooseSuggestChange={this.props.chooseSuggestChange}
        onClickDelete={this.props.onClickDelete}
      />
    ));
  }
}

export default SymptomList;
