import React, { Component } from "react";
import "./DrugList.css";
import DrugItem from "./DrugItem";

class DrugList extends Component {
  render() {
    return this.props.drugList.map((drug) => (
      <DrugItem
        className="drug-list-container"
        key={drug.id}
        drugItem={drug}
        delDrug={this.props.delDrug}
      />
    ));
  }
}

export default DrugList;
