import React, { Component } from "react";
import Step1 from "../Step1/Step1";
import Step2 from "../Step2/Step2";
import Step3 from "../Step3/Step3";
import ModalBox from "../ModalBox/ModalBox";
import "./MasterReport.css";
import axios from "axios";

class MasterReport extends Component {
  state = {
    currentStep: 1, // Default is Step 1
    stepFinish: "step finish",
    stepActive: "step active",
    step: "step",

    emailInputStyle: "form-control",
    userInputStyle: "form-control",

    sector: "ציבור",
    username: "",
    email: "",
    drugList: [],
    symptomsList: [],

    isDrugInsterted: false,
    isSendClicked: false,
    key: 1,
  };

  // Use the submitted data to set the state
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  sendReport = () => {
    if (this.state.symptomsList.length >= 1) {
      console.log("sending report");
      this.setState({ isSendClicked: true });

      const json = JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        sector: this.state.sector,
        drugList: this.state.drugList,
        symptomsList: this.state.symptomsList,
      });
      axios.post("https://drugcheq.herokuapp.com/side-effect-report", json);
    }
  };

  drugInserted = (isInsterted) => {
    this.setState({ isDrugInsterted: isInsterted });
  };

  drugListUpdate = (newDrugItem) => {
    this.setState({ drugList: [...this.state.drugList, newDrugItem] });
  };
  drugListDeleteItem = (id) => {
    this.setState({
      drugList: [...this.state.drugList.filter((drug) => drug.id !== id)],
    });
  };

  symptomListDeleteItem = (id) => {
    this.setState({
      symptomsList: [
        ...this.state.symptomsList.filter((drug) => drug.id !== id),
      ],
    });
  };

  symptomListUpdate = (newSymptomItem) => {
    this.setState({
      symptomsList: [...this.state.symptomsList, newSymptomItem],
    });
  };

  closeModalClicked = () => {
    this.setState({
      currentStep: 1,
      drugList: [],
      symptomsList: [],
      email: "",
      username: "",
      sector: "ציבור",
      isDrugInsterted: false,
      isSendClicked: false,
      key: this.state.key + 1,
    });
    console.log(this.state.drugList);
    console.log(this.state.symptomsList);
  };

  _next = () => {
    let notValidInput = false;
    // if (this.state.username.trim().length === 0) {
    //   this.setState({
    //     userInputStyle: this.state.userInputStyle + " invalid",
    //   });
    //   notValidInput = true;
    // }
    // if (this.state.email.trim().length === 0) {
    //   this.setState({
    //     emailInputStyle: this.state.emailInputStyle + " invalid",
    //   });
    //   notValidInput = true;
    // }

    if (this.state.currentStep === 2 && this.state.isDrugInsterted === false) {
      notValidInput = true;
    }
    if (notValidInput) return;

    let currentStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  get previousButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._prev}
        >
          <span className="material-icons arrow">arrow_forward</span>
        </button>
      );
    }
    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return (
        <button
          className="btn btn-primary float-left"
          type="button"
          onClick={this._next}
        >
          <span className="material-icons arrow">arrow_back</span>
        </button>
      );
    }
    // ...else render nothing
    return null;
  }

  get sendButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep === 3) {
      return (
        <button
          className="btn btn-info float-left send"
          type="button"
          onClick={this.sendReport}
        >
          שלח
        </button>
      );
    }
    // ...else render nothing
    return null;
  }

  render() {
    let steps_arr = [];
    for (let i = 1; i < 4; i++) {
      if (i === this.state.currentStep)
        steps_arr.push(<span className={this.state.stepActive}></span>);
      else if (i < this.state.currentStep)
        steps_arr.push(<span className={this.state.stepFinish}></span>);
      else steps_arr.push(<span className={this.state.step}></span>);
    }
    // reverse array to be from right to left
    steps_arr = steps_arr.reverse();

    return (
      <React.Fragment>
        {this.state.isSendClicked ? (
          <ModalBox closeModalClicked={this.closeModalClicked} />
        ) : null}
        <div className="master-describe-container">
          <h2>דיווח על תופעות לוואי</h2>
          <p>
            על מנת לדווח על תופעות לוואי, יש לעבור בין שלושת השלבים של הטופס.
            <br></br> עליכם לענות באופן מדויק,ככל האפשר,על כל שלב.
          </p>
        </div>

        <div className="steps-container">
          <div className="steps-circles">{steps_arr}</div>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            email={this.state.email}
            username={this.state.username}
            sector={this.state.sector}
            emailInputStyle={this.state.emailInputStyle}
            userInputStyle={this.state.userInputStyle}
          />
          <Step2
            key={this.state.key}
            currentStep={this.state.currentStep}
            drugInserted={this.drugInserted}
            drugListUpdate={this.drugListUpdate}
            drugList={this.props.drugList}
            drugListDeleteItem={this.drugListDeleteItem}
          />

          <Step3
            key={this.state.key}
            currentStep={this.state.currentStep}
            symptomListUpdate={this.symptomListUpdate}
            symptomList={this.props.symptomList}
            symptomListDeleteItem={this.symptomListDeleteItem}
          />

          <div className="prev-next-btns-container">
            {this.nextButton}
            {this.previousButton}
            {this.sendButton}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MasterReport;
