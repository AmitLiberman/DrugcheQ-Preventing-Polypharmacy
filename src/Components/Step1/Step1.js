import React, { Component } from "react";
import "./step1.css";

class Step1 extends Component {
  state = {
    isMedicalSector: false,
    sector: "",
    medicalSector: "",
  };

  componentDidMount = () => {
    this.setState({ isMedicalSector: false });
  };

  onSectorChange = (e) => {
    console.log("sector change");
    this.setState({ sector: e.target.value });
    if (e.target.value === "medical") {
      this.setState({ isMedicalSector: true });
      this.props.medicalSectorHander(true);
    } else {
      this.setState({ isMedicalSector: false });
      this.props.medicalSectorHander(false);
    }

    this.props.handleChange(e);
  };

  onMedicalSectorChange = (e) => {
    console.log("medicalsector change");
    this.setState({ medicalSector: e.target.value });
    this.props.handleChange(e);
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
            <h5>
              סקטור מדווח
              <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </h5>
            <label className="radio-option">
              ציבור
              <input
                className="radio-input"
                type="radio"
                name="sector"
                value="public"
                checked={this.props.sector === "public"}
              />
            </label>
            <label className="radio-option">
              צוות רפואי
              <input
                className="radio-input"
                type="radio"
                name="sector"
                value="medical"
                checked={this.props.sector === "medical"}
              />
            </label>
            <label className="radio-option">
              אחר
              <input
                className="radio-input"
                type="radio"
                name="sector"
                value="other"
                checked={this.props.sector === "other"}
              />
            </label>
          </div>
          {this.props.isMedicalSector ? (
            <div
              className="sector-container specific"
              onChange={(event) => this.onMedicalSectorChange(event)}
            >
              <h5>
                בחר סקטור
                <span style={{ color: "red", fontWeight: "bold" }}>*</span>
              </h5>
              <label className="radio-option">
                רפואה
                <input
                  className="radio-input"
                  type="radio"
                  name="medicalSector"
                  value="medicine"
                  checked={this.props.medicalSector === "medicine"}
                />
              </label>
              <label className="radio-option">
                רוקחות
                <input
                  className="radio-input"
                  type="radio"
                  name="medicalSector"
                  value="pharmacy"
                  checked={this.props.medicalSector === "pharmacy"}
                />
              </label>
              <label className="radio-option">
                סיעוד
                <input
                  className="radio-input"
                  type="radio"
                  name="medicalSector"
                  value="nursing"
                  checked={this.props.medicalSector === "nursing"}
                />
              </label>
              <label className="radio-option">
                אחר
                <input
                  className="radio-input"
                  type="radio"
                  name="medicalSector"
                  value="other"
                  checked={this.props.medicalSector === "other"}
                />
              </label>
            </div>
          ) : null}
        </div>
        <div className="personal-detail-container">
          <label className="step1-lable" htmlFor="factorName">
            שם גורם{" "}
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              (לא חובה)
            </span>
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
            כתובת דואר אלקטרוני{" "}
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              (לא חובה)
            </span>
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
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              (לא חובה)
            </span>
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
