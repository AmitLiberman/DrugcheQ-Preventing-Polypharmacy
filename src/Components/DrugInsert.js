import React, { Component } from "react";
import DrugList from "./DrugList";
import "./DrugInsert.css";

class DrugInsert extends Component {
  state = {
    drugName: "", //drug name that submited in input
    drugList: [],
  };

  //Submit Drug Item to list
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.drugInsertHandler) {
      this.props.drugInsertHandler(true);
    }
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
    if (this.props.drugInsertHandler)
      if (this.state.drugList.length === 1) this.props.drugInsertHandler(false);
  };

  //handleInteractionCheck
  handleInteractionCheck = () => {
    alert("בודק אינטראקציה בין התרופות");
  };
  render() {
    return (
      <div>
        <form className="interaction-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-success add-drug-btn" type="submit">
                הוסף
              </button>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control input-drug-name"
              placeholder="הכנס/י שם תרופה"
              value={this.state.drugName}
              aria-label=""
              aria-describedby="basic-addon1"
            />
          </div>
        </form>
        <div className="drug-list-container">
          <DrugList delDrug={this.delDrug} drugList={this.state.drugList} />
        </div>
      </div>
    );
  }
}

export default DrugInsert;
