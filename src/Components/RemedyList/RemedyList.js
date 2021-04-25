import React, { Component } from "react";
import RemedyContainer from "../RemedyContainer/RemedyContainer";

class RemedyList extends Component {
  render() {
    return this.props.remedies.map((remedy) => (
      <RemedyContainer
        key={remedy.id}
        remedyItem={remedy}
        delRemedy={this.props.delRemedy}
        addDrug={this.props.addDrug}
        isValidDrug={this.props.isValidDrug}
        validDrug={this.props.validDrug}
        chooseSuggestChange={this.props.chooseSuggestChange}
        onDrugAdded={this.props.onDrugAdded}
      />
    ));
  }
}

export default RemedyList;
