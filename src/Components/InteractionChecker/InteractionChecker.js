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
    alertClass: "alert-drug-list fadeOut",
  };

  drugInsertHandler = (e) => {
    this.setState({ isDrugInsert: e });
  };
  drugListUpdate = (newDrugItem) => {
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
  };

  drugListDeleteItem = (id) => {
    this.setState({
      drugList: [...this.state.drugList.filter((drug) => drug.id !== id)],
    });
    if (this.state.drugList.length === 1)
      this.setState({ isDrugInsert: false });
  };

  handleInteractionCheck = () => {
    if (this.state.drugList.length > 1) {
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
    } else {
      this.setState({
        alertClass: "alert-drug-list fadeIn",
      });

      setTimeout(() => {
        this.setState({
          alertClass: "alert-drug-list fadeOut",
        });
      }, 2000);
    }
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
      <div className="progress-interaction">
        <h2 className="progress-interaction-headline"> .. בודק אינטראקציה</h2>
        <CircularProgress />
      </div>
    );

    let checkForm = "";
    if (this.state.interacionRes == null) {
      checkForm = (
        <div>
          <DrugInsert
            drugInsertHandler={this.drugInsertHandler}
            drugListUpdate={this.drugListUpdate}
            drugList={this.state.drugList}
            delDrug={this.drugListDeleteItem}
            drugNotInList={this.drugNotInList}
          />

          {checkIntreactionBtn}

          <div className={this.state.alertClass}>יש להזין לפחות 2 תרופות</div>
        </div>
      );
    } else
      checkForm = (
        <div>
          <h2 className="interaction-between-headline">
            אינטראקציה בין התרופות שלך
          </h2>
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
