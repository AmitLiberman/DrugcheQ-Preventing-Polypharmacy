import React, { Component } from "react";
import "./step1.css";

class Step1 extends Component {
  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="form-group1">
        <div className="main-sectors-container">
          <div className="sector-container">
            <h5>סקטור מדווח</h5>
            <label className="radio-option">
              ציבור
              <input className="radio-input" type="radio" name="radio" />
            </label>
            <label className="radio-option">
              צוות רפואי
              <input className="radio-input" type="radio" name="radio" />
            </label>
            <label className="radio-option">
              אחר
              <input className="radio-input" type="radio" name="radio" />
            </label>
          </div>
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
        </div>
        <div className="personal-detail-container">
          <label className="step1-lable" htmlFor="username">
            שם מלא
          </label>
          <input
            className={this.props.userInputStyle}
            id="username"
            name="username"
            type="text"
            placeholder="הכנס שם מלא"
            value={this.props.username} // Prop: The email input data
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
        </div>
      </div>
    );
  }
}

export default Step1;
