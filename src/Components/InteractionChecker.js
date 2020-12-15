import { render } from "@testing-library/react";
import React, { Component } from "react";
import "./InteractionChecker.css";

class InteractionChecker extends Component {
  state = {
    drugs: "some drug name",
  };

  handleSubmit = (event) => {
    alert("asd");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button className="btn btn-success add-drug-btn" type="submit">
          הוסף
        </button>
        <input
          type="text"
          className="input-drug-name"
          placeholder="הכנסת שם תרופה בעברית או באנגלית"
        />
      </form>
    );
  }
}
export default InteractionChecker;
