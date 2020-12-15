import React, { Component } from "react";
import "./InteractionChecker.css";
import Drug from "./Drug";

class InteractionChecker extends Component {
  state = {
    drugName: "",
    drugList: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ drugList: [...this.state.drugList, this.state.drugName] });
  };

  handleChange = (event) => {
    this.setState({ drugName: event.target.value });
  };

  render() {
    const drugs = (
      <div>
        {this.state.drugList.map((drugItem) => {
          return <Drug drugName={drugItem} />;
        })}
      </div>
    );

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
            value={this.drugName}
          />
        </form>
        {drugs}
      </div>
    );
  }
}
export default InteractionChecker;
