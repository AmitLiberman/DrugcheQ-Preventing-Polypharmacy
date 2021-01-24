import React, { Component } from "react";
import "./InteractionChecker.css";
import DrugInsert from "../DrugInsert/DrugInsert";
import InteractionResults from "../InteractionResults/InteractionResults";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

class InteractionChecker extends Component {
  state = {
    isDrugInsert: false,
    drugList: [],
    response: null,
    interacionRes: null,
    loading: false,
  };

  drugInsertHandler = (e) => {
    this.setState({ isDrugInsert: e });
  };
  drugListUpdate = (newDrugItem) => {
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
  };
  handleInteractionCheck = () => {
    const drugNames = this.state.drugList.map((drug) => {
      return drug.name;
    });

    const request = this.buildGetInteractionsReq(drugNames);
    this.setState({ loading: true }, () => {
      axios
        .get(request)
        .then((response) => {
          console.log(response.data);
          this.setState({ interacionRes: response.data });
          this.setState({ loading: false });
        })
        .catch((error) => {
          alert("error!");
        });
    });
  };

  //build the get request for interaction check
  buildGetInteractionsReq = (drugNames) => {
    let request = "http://127.0.0.1:5000/check?";
    drugNames.forEach((drugName) => {
      request += drugName + "&";
    });
    request = request.slice(0, -1);
    return request;
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

    let progress = (
      <div>
        <h1> .. בודק אינטראקציה</h1>
        <CircularProgress />
      </div>
    );

    let checkForm = "";
    if (this.state.interacionRes == null) {
      checkForm = (
        <div>
          <div className="interaction-describe-container">
            <h2>בדיקת אינטראקציה בין תרופות</h2>
            <p>
              התחל להקליד שם תרופה ובחר את ההתאמה הטובה ביותר מרשימת ההצעות.
              חזור על התהליך כדי להוסיף מספר תרופות.<br></br> לאחר השלמת הרשימה
              שלך, תוכל לבדוק אם קיימת אינטראקציה באופן מיידי או לשמור את הרשימה
              שלך לבדיקה עתידית.
            </p>
          </div>
          <DrugInsert
            drugInsertHandler={this.drugInsertHandler}
            drugListUpdate={this.drugListUpdate}
          />
          {checkIntreactionBtn}
        </div>
      );
    } else
      checkForm = (
        <div>
          <h1>אינטראקציה בין התרופות שלך</h1>
          <InteractionResults results={this.state.interacionRes} />
        </div>
      );

    return (
      <div className="interaction-container">
        {this.state.loading ? progress : checkForm}
      </div>
    );
  }
}

export default InteractionChecker;
