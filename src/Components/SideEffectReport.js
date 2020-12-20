import React, { Component } from "react";
import "./SideEffectReport.css";
import DrugInsert from "./DrugInsert";
import Report from "./Report";

export class SideEffectReport extends Component {
  render() {
    return (
      <div>
        <div className="drug-list-report-container">
          <DrugInsert />
        </div>
        <div className="sid-effect-report-container">
          <Report />
        </div>
      </div>
    );
  }
}

export default SideEffectReport;
