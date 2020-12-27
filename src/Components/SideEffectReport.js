import React, { Component } from "react";
import "./SideEffectReport.css";
import DrugInsert from "./DrugInsert";
import Report from "./Report";

class SideEffectReport extends Component {
  state = {
    isDrugInsert: false,
    isSymptomInsert: false,
  };

  drugInsertHandler = (e) => {
    this.setState({ isDrugInsert: e });
  };

  symptomInsertHandler = (e) => {
    this.setState({ isSymptomInsert: e });
  };

  render() {
    let sendReportBtn = "";

    if (this.state.isDrugInsert && this.state.isSymptomInsert) {
      sendReportBtn = (
        <div className="submit-report-btn-container">
          <button
            onClick={this.handleInteractionCheck}
            className="btn btn-outline-dark send-btn"
          >
            דווח
          </button>
        </div>
      );
    }

    return (
      <div className="SideEffectReport">
        <div className="side-effect-describe-container">
          <h2>דיווח תופעות לוואי</h2>
          <p>
            יש להקליד שם תרופה ולבחור את ההתאמה הטובה ביותר מרשימת ההצעות.
            <br></br> לאחר הזנת שמות התרופות, יש להקליד את התסמינים אותם אתם
            חווים ולבחור את ההתאמה הטובה יותר.<br></br> יש חזור על התהליך כדי
            להוסיף מספר תרופות ותסמינים. לאחר השלמת הרשימה , ניתן לשלוח את הטופס
            לבדיקת המערכת.
          </p>
        </div>

        <div className=" form-group report-details-container">
          <input
            type="number"
            className="age-input"
            id="age-input"
            placeholder="הזן"
          />
          <select className="gender-input" id="inputGroupSelect01">
            <option selected>בחר</option>
            <option value="1">זכר</option>
            <option value="2">נקבה</option>
          </select>
        </div>

        <div className="drug-list-report-container">
          <DrugInsert drugInsertHandler={this.drugInsertHandler} />
        </div>
        <div className="sid-effect-report-container">
          <Report symptomInsertHandler={this.symptomInsertHandler} />
        </div>
        {sendReportBtn}
      </div>
    );
  }
}

export default SideEffectReport;
