import React, { Component } from "react";
import "./InteractionChecker.css";
import DrugInsert from "../DrugInsert/DrugInsert";
import InteractionResults from "../InteractionResults/InteractionResults";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";

class InteractionChecker extends Component {
  state = {
    isDrugInsert: false,
    drugList: [],
    response: null,
    interacionRes: null,
    loading: false,
    notInList: "alert-drug-list fadeOut",
    twoDrugsMsg: "",
    chartData: {
      labels: [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford",
      ],
      datasets: [
        {
          label: "Population",
          data: [617594, 181045, 153060, 106519, 105162, 95072],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    },
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

  //build the get request for interaction check
  buildGetInteractionsReq = (drugNames) => {
    let request = "https://drugcheq.herokuapp.com/check?";
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
          <div className="interaction-describe-container">
            <h2>בדיקת אינטראקציה בין תרופות</h2>
            <p>
              התחל להקליד שם תרופה ובחר את ההתאמה הטובה ביותר מרשימת ההצעות.
              <br></br>
              חזור על התהליך כדי להוסיף מספר תרופות.<br></br> לאחר השלמת הרשימה
              שלך, תוכל לבדוק אם קיימת אינטראקציה באופן<br></br> מיידי או לשמור
              את הרשימה שלך לבדיקה עתידית.
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
          <h2 className="interaction-between-headline">
            אינטראקציה בין התרופות שלך
          </h2>
          <Pie
            data={this.state.chartData}
            width={400}
            height={200}
            options={{ maintainAspectRatio: false, responsive: false }}
          />
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
