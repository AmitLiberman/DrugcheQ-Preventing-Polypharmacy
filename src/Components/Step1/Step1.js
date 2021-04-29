import React, { Component } from "react";
import "./step1.css";

class Step1 extends Component {
  state = {
    isMedicalSector: false,
  };

  onSectorChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "medical") this.setState({ isMedicalSector: true });
    else this.setState({ isMedicalSector: false });
  };

  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="form-group1">
        <div className="main-sectors-container">
          <div
            className="sector-container"
            onChange={(event) => this.onSectorChange(event)}
          >
            <h5>סקטור מדווח</h5>
            <label className="radio-option">
              ציבור
              <input
                className="radio-input"
                type="radio"
                name="radio"
                value="public"
              />
            </label>
            <label className="radio-option">
              צוות רפואי
              <input
                className="radio-input"
                type="radio"
                name="radio"
                value="medical"
              />
            </label>
            <label className="radio-option">
              אחר
              <input
                className="radio-input"
                type="radio"
                name="radio"
                value="other"
              />
            </label>
          </div>
          {this.state.isMedicalSector ? (
            <div className="sector-container specific">
              <h5>בחר סקטור</h5>
              <label className="radio-option">
                רפואה
                <input className="radio-input" type="radio" name="radio" />
              </label>
              <label className="radio-option">
                רוקחות
                <input className="radio-input" type="radio" name="radio" />
              </label>
              <label className="radio-option">
                סיעוד
                <input className="radio-input" type="radio" name="radio" />
              </label>
              <label className="radio-option">
                אחר
                <input className="radio-input" type="radio" name="radio" />
              </label>
            </div>
          ) : null}
        </div>
        <div className="personal-detail-container">
          <label className="step1-lable" htmlFor="factorName">
            שם גורם
          </label>
          <input
            className={this.props.userInputStyle}
            id="factorName"
            name="factorName"
            type="text"
            placeholder="הכנס את שמך או את שם הארגון"
            value={this.props.factorName} // Prop: The email input data
            onChange={this.props.handleChange} // Prop: Puts data into state
          />
          <label className="step1-lable" htmlFor="email">
            כתובת דואר אלקטרוני
          </label>
          <input
            className={this.props.emailInputStyle}
            id="email"
            name="email"
            type="text"
            placeholder="example@mail.com"
            value={this.props.email} // Prop: The email input data
            onChange={this.props.handleChange} // Prop: Puts data into state
          />
          <label className="step1-lable" htmlFor="phoneNumber">
            מספר טלפון{" "}
          </label>
          <input
            className={this.props.emailInputStyle}
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            placeholder="01-2345678"
            value={this.props.phoneNumber} // Prop: The email input data
            onChange={this.props.handleChange} // Prop: Puts data into state
          />
        </div>
      </div>
    );
  }
}

export default Step1;
