import React, { Component } from "react";
import RemedyContainer from "../RemedyContainer/RemedyContainer";

class RemedyList extends Component {
  render() {
    return this.props.drugitems.map((item) => (
      <RemedyContainer
        remedyItem={item}
        chooseSuggestChange={this.props.chooseSuggestChange}
        getDrugValue={this.props.getDrugValue}
        onClickDelete={this.props.onClickDelete}
      />
    ));
  }
}

export default RemedyList;
