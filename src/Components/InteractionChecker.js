import React, { Component } from "react";
import "./InteractionChecker.css";
import DrugList from "./DrugList";

class InteractionChecker extends Component {
  state = {
    drugName: "",
    drugList: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newDrugItem = {
      id: this.state.drugList.length + 1,
      name: this.state.drugName,
    };
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
    this.setState({ drugName: "" });
  };

  handleChange = (event) => {
    this.setState({ drugName: event.target.value });
  };

  //Delete Drug Item from list
  delDrug = (id) => {
    this.setState({
      drugList: [...this.state.drugList.filter((drug) => drug.id !== id)],
    });
  };

  render() {
    return (
      <div className="interaction-container">
        <form className="interaction-form" onSubmit={this.handleSubmit}>
          <button className="btn btn-success add-drug-btn" type="submit">
            הוסף
          </button>
          <input
            onChange={this.handleChange}
            type="text"
            className="input-drug-name"
            placeholder="הכנסת שם תרופה בעברית או באנגלית"
            value={this.state.drugName}
          />
        </form>
        <DrugList delDrug={this.delDrug} drugList={this.state.drugList} />
      </div>
    );
  }
}
export default InteractionChecker;
