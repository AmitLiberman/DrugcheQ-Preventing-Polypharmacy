import React, { Component } from "react";
import "./DrugItem.css";

class DrugItem extends Component {
  render() {
    const { id, name } = this.props.drugItem;
    return (
      <div className="drug-item-container">
        <button
          onClick={this.props.delDrug.bind(this, id)}
          className="btn btn-danger delete-item-btn"
        >
          x
        </button>

        <p className="drug-item">{this.props.drugItem.name}</p>
      </div>
    );
  }
}

export default DrugItem;
