import React, { Component } from "react";
import "./DrugSearchInput.css";

class DrugSearchInput extends Component {
  state = {
    drugName: "", //drug name that submited in input
  };

  //Change State to the drug name that typed
  handleChange = (event) => {
    this.setState({ drugName: event.target.value });
  };

  handleSubmit = () => {
    alert(this.state.drugName);
  };
  render() {
    return (
      <div className="drug-search-container">
        <div className="drug-search-describe-container">
          <h2>חיפוש תרופה</h2>
          <p>התחל להקליד שם תרופה ובחר את ההתאמה הטובה ביותר מרשימת ההצעות.</p>
        </div>
        <form className="interaction-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-info add-drug-btn" type="submit">
                הוסף
              </button>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control input-drug-name-search"
              placeholder="הכנס/י שם תרופה"
              value={this.state.drugName}
              aria-label=""
              aria-describedby="basic-addon1"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default DrugSearchInput;
