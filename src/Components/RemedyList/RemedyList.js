import React, { Component } from "react";
import RemedyContainer from "../RemedyContainer/RemedyContainer";

class RemedyList extends Component {
  render() {
    console.log("render list");

    return this.props.drugitems.map((item, i) => (
      <RemedyContainer
        key={i}
        remedyItem={item}
        drugitems={this.props.drugitems}
        drugList={this.props.drugList}
        chooseSuggestChange={this.props.chooseSuggestChange}
        getDrugValue={this.props.getDrugValue}
        onClickDelete={this.props.onClickDelete}
        getDrugFromDates={this.props.getDrugFromDates}
        getDrugUntilDates={this.props.getDrugUntilDates}
        deletedId={this.props.deletedId}
      />
    ));
  }
}

export default RemedyList;
