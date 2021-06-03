import React, { Component } from "react";
import "./InteractionChecker.css";
import DrugInsert from "../DrugInsert/DrugInsert";
import InteractionStats from "../InteractionStats/InteractionStats";
import InteractionResults from "../InteractionResults/InteractionResults";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

class InteractionChecker extends Component {
  state = {
    isDrugInsert: false,
    drugList: [],
    response: null,
    interacionRes: null,
    interacionStats: null,
    loading: false,
    notInList: "alert-drug-list fadeOut",
    twoDrugsMsg: "",
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
      const request = this.buildGetStatsReq(drugNames);
      this.setState({ loading: true }, () => {
        axios
          .get(request)
          .then((response) => {
            console.log(response.data);
            this.setState({ interacionStats: response.data });
            this.sendGetInteractions(drugNames);
          })
          .catch((error) => {
            alert("error!");
          });
      });
    } else {
      this.setState({
        notInList: "alert-drug-list fadeIn",
        twoDrugsMsg: "יש להזין לפחות 2 תרופות",
      });

      setTimeout(() => {
        this.setState({
          notInList: "alert-drug-list fadeOut",
        });
      }, 2000);
    }
  };

  sendGetInteractions = (drugNames) => {
    const request = this.buildGetInteractionsReq(drugNames);
    console.log(request);
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

  //build the get request for interaction check
  buildGetStatsReq = (drugNames) => {
    let request = "http://127.0.0.1:5000/stats?";
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
            className="int-btn check"
          >
            בדיקה
          </button>
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
          <div className="interaction-describe-container">
            <h2>בדיקת אינטראקציה בין תרופות</h2>
            <p>
              התחל להקליד שם תרופה ובחר את ההתאמה הטובה ביותר מרשימת ההצעות.
              <br></br>
              <h6>
                התרופה אינה קיימת במאגר?
                <a href="/NewDrug"> לחצו כאן להצעת תרופה חדשה </a>
              </h6>
            </p>
          </div>
          <DrugInsert
            drugInsertHandler={this.drugInsertHandler}
            drugListUpdate={this.drugListUpdate}
            drugList={this.state.drugList}
            delDrug={this.drugListDeleteItem}
            notInList={this.state.notInList}
            twoDrugsMsg={this.state.twoDrugsMsg}
          />

          {checkIntreactionBtn}
        </div>
      );
    } else
      checkForm = (
        <div>
          <div className="stats">
            <h2
              className="interaction-between-headline"
              style={{ marginBottom: "1em" }}
            >
              נתוני דיווחים
            </h2>
            <InteractionStats
              interacionStats={this.state.interacionStats}
              drugList={this.state.drugList}
            />
          </div>
          <div className="drug-interaction-list">
            <h2 className="interaction-between-headline">
              אינטראקציה בין התרופות שלך
            </h2>
            <InteractionResults results={this.state.interacionRes} />
          </div>
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
