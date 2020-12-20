import React, { Component } from "react";
import DrugList from "./DrugList";
import "./DrugInsert.css";

export class DrugInsert extends Component {
  state = {
    drugName: "", //drug name that submited in input
    drugList: [],
  };

  //Submit Drug Item to list
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.handler) this.props.handler(true);
    const newDrugItem = {
      id: this.state.drugList.length + 1,
      name: this.state.drugName,
    };
    if (newDrugItem.name.trim().length !== 0) {
      //if the input not contains only spaces
      this.setState({ drugList: [...this.state.drugList, newDrugItem] });
      this.setState({ drugName: "" });
    }
  };
  //Change State to the drug name that typed
  handleChange = (event) => {
    this.setState({ drugName: event.target.value });
  };

  //Delete Drug Item from list
  delDrug = (id) => {
    this.setState({
      drugList: [...this.state.drugList.filter((drug) => drug.id !== id)],
    });
    if (this.props.handler)
      if (this.state.drugList.length === 1) this.props.handler(false);
  };

  //handleInteractionCheck
  handleInteractionCheck = () => {
    alert("בודק אינטראקציה בין התרופות");
  };
  render() {
    return (
      <div>
        <form className="interaction-form" onSubmit={this.handleSubmit}>
          <button className="btn btn-success add-drug-btn" type="submit">
            הוסף
          </button>
          <input
            onChange={this.handleChange}
            type="text"
            className="input-drug-name"
            placeholder="הכנס/י שם תרופה בעברית או באנגלית"
            value={this.state.drugName}
          />
        </form>
        <div className="drug-list-container">
          <DrugList delDrug={this.delDrug} drugList={this.state.drugList} />
        </div>
      </div>
    );
  }
}

export default DrugInsert;
