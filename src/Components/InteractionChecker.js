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
        <div class="input-group mb-4">
          <div class="input-group-prepend">
            <button class="btn btn-success" type="submit">
              הוסף
            </button>
          </div>
          <input
            type="text"
            class="form-control drug-input"
            placeholder="הכנסת שם תרופה בעברית או באנגלית"
          />
        </div>
      </form>
    );
  }
}
export default InteractionChecker;
