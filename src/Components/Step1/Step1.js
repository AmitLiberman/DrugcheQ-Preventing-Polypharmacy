import React, { Component } from "react";

class Step1 extends Component {
  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="form-group">
        <label htmlFor="sector">סקטור מדווח</label>
        <select
          id="sector"
          name="sector"
          value={this.props.sector} // Prop: The email input data
          onChange={this.props.handleChange}
          className="form-control"
        >
          <option value="public">ציבור</option>
          <option value="medical">צוות רפואי</option>
          <option value="other">אחר</option>
        </select>
        <label htmlFor="username">שם</label>
        <input
          className="form-control"
          id="username"
          name="username"
          type="text"
          placeholder="Enter username"
          value={this.props.username} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
        />
        <label htmlFor="email">כתובת דואר אלקטרוני</label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="text"
          placeholder="Enter useremailname"
          value={this.props.email} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
        />
      </div>
    );
  }
}

export default Step1;
