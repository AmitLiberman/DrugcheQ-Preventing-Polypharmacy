import React, { Component } from "react";
import "./NewDrug.css";

class NewDrug extends Component {
  render() {
    return (
      <form className="main-drug-suggest-form">
        <div className="form-group">
          <label className="new-drug-lable" for="commercialName">
            שם מסחרי (עברית/אנגלית)
          </label>
          <input
            type="text"
            className="form-control"
            id="commercialHebrew"
            placeholder="שם מסחרי"
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
            placeholder="כדורים/זריקה/משחה וכו'"
          />
        </div>

        <button type="submit" className="send-new-btn">
          שליחה
        </button>
      </form>
    );
  }
}

export default NewDrug;
