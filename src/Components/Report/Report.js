import React, { Component } from "react";
import "./Report.css";
import DrugList from "../DrugList/DrugList";

class Report extends Component {
  state = {
    conditionName: "", //condition name that submited in input
    conditionsList: [],
    drugList: [],
  };

  //Submit condition Item to list
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.symptomInsertHandler) this.props.symptomInsertHandler(true);
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
    this.props.symptomListUpdate(newConditionItem);
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
    if (this.props.symptomInsertHandler)
      if (this.state.conditionsList.length === 1)
        this.props.symptomInsertHandler(false);
  };
  render() {
    return (
      <React.Fragment>
        <form className="side-effect-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-info add-side-effect-btn"
                type="submit"
              >
                + הוסף
              </button>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control input-side-effect-name"
              placeholder="הכנס/י שם התסמין "
              value={this.state.conditionName}
              aria-label=""
              aria-describedby="basic-addon1"
            />
          </div>
        </form>

        <div className="drug-list-container">
          <DrugList
            delDrug={this.delCondition}
            drugList={this.props.conditionsList}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Report;
