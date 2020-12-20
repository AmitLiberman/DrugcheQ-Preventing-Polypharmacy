import React, { Component } from "react";
import "./InteractionChecker.css";
import DrugInsert from "./DrugInsert";

class InteractionChecker extends Component {
  state = {
    showButtons: false,
  };

  showButtonsHandler = (e) => {
    this.setState({ showButtons: e });
  };

  render() {
    let checkIntreactionBtn = "";
    if (this.state.showButtons === true) {
      checkIntreactionBtn = (
        <div className="submit-drug-list-btn-container">
          <button
            onClick={this.handleInteractionCheck}
            className="btn btn-primary check-btn"
          >
            בדיקה
          </button>
          <button className="btn btn-light save-btn">שמור רשימה</button>
        </div>
      );
    }
    return (
      <div className="interaction-container">
        <DrugInsert handler={this.showButtonsHandler} />
        {checkIntreactionBtn}
      </div>
    );
  }
}
export default InteractionChecker;
