import React, { Component } from "react";
import "./Report.css";
import DrugList from "./DrugList";

export class Report extends Component {
  state = {
    conditionName: "", //condition name that submited in input
    conditionsList: [],
  };

  //Submit condition Item to list
  handleSubmit = (event) => {
    event.preventDefault();
    const newConditionItem = {
      id: this.state.conditionsList.length + 1,
      name: this.state.conditionName,
    };
    if (newConditionItem.name.trim().length !== 0) {
      //if the input not contains only spaces
      this.setState({
        conditionsList: [...this.state.conditionsList, newConditionItem],
      });
      this.setState({ conditionName: "" });
    }
  };
  //Change State to the condition name that typed
  handleChange = (event) => {
    this.setState({ conditionName: event.target.value });
  };

  //Delete condition Item from list
  delCondition = (id) => {
    this.setState({
      conditionsList: [
        ...this.state.conditionsList.filter((drug) => drug.id !== id),
      ],
    });
  };
  render() {
    return (
      <div>
        <form className="side-effect-form" onSubmit={this.handleSubmit}>
          <button className="btn btn-primary add-side-effect-btn" type="submit">
            הוסף
          </button>
          <input
            onChange={this.handleChange}
            type="text"
            className="input-side-effect-name"
            placeholder="הכנס/י את התסמין אותו את/ה חווה"
            value={this.state.conditionName}
          />
        </form>

        <div className="drug-list-container">
          <DrugList
            delDrug={this.delCondition}
            drugList={this.state.conditionsList}
          />
        </div>
      </div>
    );
  }
}

export default Report;
