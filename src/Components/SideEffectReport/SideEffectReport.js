import React, { Component } from "react";
import "./SideEffectReport.css";
import DrugInsert from "../DrugInsert/DrugInsert";
import Report from "../Report/Report";

class SideEffectReport extends Component {
  state = {
    isDrugInsert: false,
    isSymptomInsert: false,
    drugList: [],
  };

  drugListUpdate = (newDrugItem) => {
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
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
        <button
          onClick={this.handleInteractionCheck}
          className="btn btn-outline-dark  btn-lg send-btn"
        >
          דווח
        </button>
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

        <div className="drug-symptom-list-container">
          <div className="report-details-container">
            <lable className="control-label" htmlFor="age-input">
              גיל
            </lable>
            <input
              type="number"
              className="form-control age-input"
              id="age-input"
              placeholder="הזן"
            />
            <lable className="control-label" htmlFor="gender-input">
              מין
            </lable>
            <select className="form-control gender-input" id="gender-input">
              <option value="1" selected>
                בחר
              </option>
              <option value="1">זכר</option>
              <option value="2">נקבה</option>
            </select>
          </div>
          <div className="drug-symptom-continer">
            <div className="drug-list-report-container">
              <DrugInsert
                drugInsertHandler={this.drugInsertHandler}
                drugListUpdate={this.drugListUpdate}
              />
            </div>

            <div className="sid-effect-report-container">
              <Report symptomInsertHandler={this.symptomInsertHandler} />
            </div>
          </div>
          {sendReportBtn}
        </div>
      </div>
    );
  }
}

export default SideEffectReport;
