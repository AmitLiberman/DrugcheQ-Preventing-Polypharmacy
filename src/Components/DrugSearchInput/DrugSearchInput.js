import React, { Component } from "react";
import "./DrugSearchInput.css";
import axios from "axios";

class DrugSearchInput extends Component {
  state = {
    drugName: "", //drug name that submited in input
    searchResponse: "",
  };

  //Change State to the drug name that typed
  handleChange = (event) => {
    this.setState({ drugName: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let request = "http://127.0.0.1:5000/drug-search?";
    request += this.state.drugName;
    axios
      .get(request)
      .then((response) => {
        console.log(response.data);
        this.props.getDrugData(response.data, this.state.drugName);
      })
      .catch((error) => {
        alert("error!");
      });
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
                חיפוש
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
