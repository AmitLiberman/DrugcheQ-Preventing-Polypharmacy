import React, { Component } from "react";
import Step1 from "../Step1/Step1";
import Step2 from "../Step2/Step2";
import Step3 from "../Step3/Step3";
import "./MasterReport.css";

class MasterReport extends Component {
  state = {
    currentStep: 1, // Default is Step 1
    stepFinish: "step finish",
    stepActive: "step active",
    step: "step",

    emailInputStyle: "form-control",
    userInputStyle: "form-control",

    sector: "",
    username: "",
    email: "",
  };

  // Use the submitted data to set the state
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, sector } = this.state;
    alert(`Your registration detail: \n 
    Email: ${email} \n 
    Username: ${username} \n
    Sector: ${sector}`);
  };

  _next = () => {
    let notValidInput = false;
    if (this.state.username.trim().length === 0) {
      this.setState({
        userInputStyle: this.state.userInputStyle + " invalid",
      });
      notValidInput = true;
    }
    if (this.state.email.trim().length === 0) {
      this.setState({
        emailInputStyle: this.state.emailInputStyle + " invalid",
      });
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
        <div className="master-describe-container">
          <h2>דיווח על תופעות לוואי</h2>
          <p>
            על מנת לדווח על תופעות לוואי, יש לעבור בין שלושת השלבים של הטופס.
            <br></br> עליכם לענות באופן מדויק,ככל האפשר,על כל שלב.
          </p>
        </div>

        <div className="steps-container">
          {/* שלב
          {this.state.currentStep} */}
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
          <Step2 currentStep={this.state.currentStep} />
          <Step3 currentStep={this.state.currentStep} />
          <div className="prev-next-btns-container">
            {this.nextButton}
            {this.previousButton}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MasterReport;
