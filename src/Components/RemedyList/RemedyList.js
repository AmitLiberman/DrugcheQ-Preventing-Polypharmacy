import React, { Component } from "react";
import RemedyContainer from "../RemedyContainer/RemedyContainer";

class RemedyList extends Component {
  render() {
    return this.props.drugitems.map((item) => (
      <RemedyContainer
        key={item.id}
        remedyItem={item}
        // delRemedy={this.props.delRemedy}
        // addDrug={this.props.addDrug}
        // isValidDrug={this.props.isValidDrug}
        // validDrug={this.props.validDrug}
        chooseSuggestChange={this.props.chooseSuggestChange}
        // onDrugAdded={this.props.onDrugAdded}
        getDrugValue={this.props.getDrugValue}
        onClickDelete={this.props.onClickDelete}
      />
    ));
  }
}

export default RemedyList;
