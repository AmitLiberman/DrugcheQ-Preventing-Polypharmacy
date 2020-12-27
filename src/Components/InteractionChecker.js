import React, { Component } from "react";
import "./InteractionChecker.css";
import DrugInsert from "./DrugInsert";

class InteractionChecker extends Component {
  state = {
    isDrugInsert: false,
  };

  drugInsertHandler = (e) => {
    this.setState({ isDrugInsert: e });
  };

  render() {
    let checkIntreactionBtn = "";
    if (this.state.isDrugInsert === true) {
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
        <div className="interaction-describe-container">
          <h2>בדיקת אינטראקציה בין תרופות</h2>
          <p>
            התחל להקליד שם תרופה ובחר את ההתאמה הטובה ביותר מרשימת ההצעות. חזור
            על התהליך כדי להוסיף מספר תרופות.<br></br> לאחר השלמת הרשימה שלך,
            תוכל לבדוק אם קיימת אינטראקציה באופן מיידי או לשמור את הרשימה שלך
            לבדיקה עתידית.
          </p>
        </div>
        <DrugInsert drugInsertHandler={this.drugInsertHandler} />
        {checkIntreactionBtn}
      </div>
    );
  }
}
export default InteractionChecker;
