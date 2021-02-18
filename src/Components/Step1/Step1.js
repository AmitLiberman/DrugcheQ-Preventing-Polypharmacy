import React, { Component } from "react";
import "./step1.css";

class Step1 extends Component {
  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="form-group">
        <label className="step1-lable" htmlFor="sector">
          סקטור מדווח
        </label>
        <select
          id="sector"
          name="sector"
          //   value={this.props.sector} // Prop: The email input data
          value={this.props.sector}
          onChange={this.props.handleChange}
          className="form-control"
        >
          <option>ציבור</option>
          <option>צוות רפואי</option>
          <option>אחר</option>
        </select>
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
          placeholder="הכנס דואר אלקטרוני"
          value={this.props.email} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
        />
      </div>
    );
  }
}

export default Step1;
