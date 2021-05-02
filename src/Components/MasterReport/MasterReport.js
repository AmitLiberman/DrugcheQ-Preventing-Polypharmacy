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

    sector: "",
    medicalSector: "",
    factorName: "",
    email: "",
    phoneNumber: "",

    drugList: [],

    symptomList: [],

    isMedicalSector: false,

    isDrugInsterted: false,
    isSendClicked: false,
    key: 1,
    stam: false,
    onNext: false,
  };

  // Use the submitted data to set the state
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  sendReport = () => {
    if (this.state.symptomList.length === 0) {
      alert("יש למלא את כל שדות החובה המסומנים ב *");
      return;
    }
    this.setState({ stam: !this.setState.stam });
    console.log(this.state.factorName);
    console.log(this.state.email);
    console.log(this.state.phoneNumber);
    console.log(this.state.sector);
    console.log(this.state.medicalSector);
    console.log(this.state.drugList);
    console.log(this.state.symptomList);
    console.log("sending report");
    this.setState({ isSendClicked: true });

    const json = JSON.stringify({
      factorName: this.state.factorName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      sector: this.state.sector,
      medicalSector: this.state.medicalSector,
      drugList: this.state.drugList,
      symptomList: this.state.symptomList,
    });
    // axios.post("https://drugcheq.herokuapp.com/side-effect-report", json);

    axios.post("http://127.0.0.1:5000/side-effect-report", json);
  };

  updateDrugListIds = (newDrugList) => {
    this.setState({ drugList: newDrugList });
  };

  updateSymptomListIds = (newSymptomList) => {
    this.setState({ symptomList: newSymptomList });
  };

  drugInserted = (isInsterted) => {
    this.setState({ isDrugInsterted: isInsterted });
  };

  drugListUpdate = (newDrugName) => {
    this.setState({ drugList: [...this.state.drugList, newDrugName] });
  };
  drugListDeleteItem = (id) => {
    this.setState({
      drugList: [...this.state.drugList.filter((drug) => drug.id !== id)],
    });
  };

  symptomListDeleteItem = (id) => {
    this.setState({
      symptomList: [
        ...this.state.symptomList.filter((symptom) => symptom.id !== id),
      ],
    });
  };

  symptomListUpdate = (newSymptomItem) => {
    this.setState({
      symptomList: [...this.state.symptomList, newSymptomItem],
    });
  };

  medicalSectorHander = (flag) => {
    this.setState({ isMedicalSector: flag });
  };

  closeModalClicked = () => {
    this.setState({
      currentStep: 1,
      drugList: [],
      symptomList: [],
      sector: "",
      medicalSector: "",
      factorName: "",
      email: "",
      phoneNumber: "",
      isDrugInsterted: false,
      isSendClicked: false,
      isMedicalSector: false,
      // key: this.state.key + 1,
    });
  };

  _next = () => {
    if (
      this.state.currentStep === 1 &&
      (this.state.sector === "" ||
        (this.state.sector === "medical" && this.state.medicalSector === ""))
    ) {
      alert("יש למלא את כל שדות החובה המסומנים ב *");
      return;
    } else if (
      this.state.currentStep === 2 &&
      this.state.drugList.length === 0
    ) {
      alert("יש למלא את כל שדות החובה המסומנים ב *");
      return;
    }

    let currentStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
      onNext: true,
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
          className="next-prev-btn prev"
          type="button"
          onClick={this._prev}
        >
          הקודם
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
          // className="btn btn-primary float-left"
          className="next-prev-btn next"
          type="button"
          onClick={this._next}
        >
          הבא
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
          className="next-prev-btn send"
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
        </div>

        <div className="steps-container">
          <div className="steps-circles">{steps_arr}</div>
          <Step1
            isMedicalSector={this.state.isMedicalSector}
            medicalSectorHander={this.medicalSectorHander}
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            emailInputStyle={this.state.emailInputStyle}
            userInputStyle={this.state.userInputStyle}
            sector={this.state.sector}
            medicalSector={this.state.medicalSector}
            factorName={this.state.factorName}
            email={this.state.email}
            phoneNumber={this.state.phoneNumber}
          />
          <Step2
            currentStep={this.state.currentStep}
            drugInserted={this.drugInserted}
            drugListUpdate={this.drugListUpdate}
            drugListDeleteItem={this.drugListDeleteItem}
            drugList={this.state.drugList}
            handleChange={this.handleChange}
            updateDrugListIds={this.updateDrugListIds}
          />

          <Step3
            currentStep={this.state.currentStep}
            symptomListUpdate={this.symptomListUpdate}
            symptomList={this.state.symptomList}
            symptomListDeleteItem={this.symptomListDeleteItem}
            updateSymptomListIds={this.updateSymptomListIds}
            handleChange={this.handleChange}
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
