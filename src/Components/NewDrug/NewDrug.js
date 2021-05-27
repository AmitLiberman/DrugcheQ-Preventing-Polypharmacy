import React, { Component } from "react";
import "./NewDrug.css";

class NewDrug extends Component {
  state = {
    commercialName: "",
    genericName: "",
    useForm: "",
    missDrugName: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert(
      "commercialName: " +
        this.state.commercialName +
        "\ngenericName: " +
        this.state.genericName +
        "\nuseForm: " +
        this.state.useForm
    );

    if (
      this.state.commercialName.trim().length === 0 &&
      this.state.genericName.trim().length === 0
    ) {
      this.setState({
        missDrugName: "missDrugName fadeIn",
        alertMsg: "יש להזין לפחות שם תרופה אחד (מסחרי ו/או גנרי) ",
      });

      setTimeout(() => {
        this.setState({
          missDrugName: "missDrugName fadeOut",
        });
      }, 2000);
    }

    this.setState({
      useForm: "",
      genericName: "",
      commercialName: "",
    });
  };
  // Use the submitted data to set the state
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <div className="main-new-drug-container">
        <h2>הצעת תרופה חדשה</h2>
        <h6>אנא הזינו את כל הפרטים העומדים לרשותכם</h6>

        <form className="main-drug-suggest-form" onSubmit={this.handleSubmit}>
          <div className={this.state.missDrugName}>{this.state.alertMsg}</div>

          <div className="form-group">
            <label className="new-drug-lable" for="commercialName">
              שם מסחרי (עברית/אנגלית)
            </label>
            <input
              type="text"
              className="form-control"
              id="commercialName"
              placeholder="שם מסחרי"
              name="commercialName"
              value={this.state.commercialName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="new-drug-lable" for="genericName">
              שם גנרי (עברית/אנגלית)
            </label>
            <input
              type="text"
              className="form-control"
              id="genericName"
              placeholder="שם גנרי"
              name="genericName"
              value={this.state.genericName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="new-drug-lable" for="useForm">
              דרך מתן/שימוש
            </label>
            <input
              type="text"
              className="form-control"
              id="useForm"
              name="useForm"
              value={this.state.useForm}
              onChange={this.handleChange}
              placeholder="כדורים/זריקה/משחה וכו'"
            />
          </div>

          <button type="submit" className="send-new-btn">
            שליחה
          </button>
        </form>
      </div>
    );
  }
}

export default NewDrug;
