import React, { Component } from "react";
import FormManagerStyles from "./FormManager.module.css";

class FormManger extends Component {
  state = {
    currentStep: 1, // Default is Step 1
    stageFinish: "stage finish",
    stageActive: "stage active",
    stage: "stage",
  };
  render() {
    let steps_arr = [];
    for (let i = 1; i < 4; i++) {
      if (i === this.state.currentStep)
        steps_arr.push(<span className={this.state.stageActive}></span>);
      else if (i < this.state.currentStep)
        steps_arr.push(<span className={this.state.stageFinish}></span>);
      else steps_arr.push(<span className={this.state.stage}></span>);
    }
    // reverse array to be from right to left
    steps_arr = steps_arr.reverse();

    return (
      <div className={FormManagerStyles.container}>
        <div className={FormManagerStyles.stages}>
          <h6 className={FormManagerStyles.stage}>פרטי המדווח</h6>
          <span className={FormManagerStyles.seperator}>/</span>
          <h6 className={FormManagerStyles.stage}>פרטי התכשירים</h6>
          <span className={FormManagerStyles.seperator}>/</span>
          <h6 className={FormManagerStyles.stage}>פרטים על תופות לוואי</h6>
        </div>
        <div className={FormManagerStyles.mainForm}>
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
        <div className={FormManagerStyles.buttons}>
          <button>הבא</button>
          <button>הקודם</button>
        </div>
      </div>
    );
  }
}

export default FormManger;
