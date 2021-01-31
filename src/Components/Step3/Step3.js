import React, { Component } from "react";

class Step3 extends Component {
  render() {
    if (this.props.currentStep !== 3) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="form-group">
        <label htmlFor="password">password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="text"
          placeholder="Enter password"
          value={this.props.password} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
        />
      </div>
    );
  }
}

export default Step3;
