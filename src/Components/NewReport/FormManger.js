import React, { Component } from "react";
import FormManagerStyles from "./FormManager.module.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

class FormManger extends Component {
  state = {
    currentStep: 1, // Default is Step 1
    stageFinish: "stage finish",
    stageActive: "stage active",
    stage: "stage",
    mainSectorvalue: "",
    specificSectorValue: "",
  };

  mainSectorhandleChange = (event) => {
    this.setState({ mainSectorvalue: event.target.value });
    console.log(this.state.mainSectorvalue);
  };

  specificSectorhandleChange = (event) => {
    this.setState({ specificSectorValue: event.target.value });
    console.log(this.state.specificSectorValue);
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
          <div className={FormManagerStyles.mainSector}>
            <FormControl
              className={FormManagerStyles.sectorRadioContainer}
              component="fieldset"
            >
              <FormLabel component="legend" style={{ color: "black" }}>
                סקטור מדווח
              </FormLabel>
              <RadioGroup
                aria-label="סקטור מדווח"
                name="sector"
                value={this.state.mainSectorvalue}
                onChange={this.mainSectorhandleChange}
              >
                <FormControlLabel
                  className={FormManagerStyles.RadioOption}
                  value="public"
                  control={<Radio />}
                  label="ציבור"
                  color="secondary"
                />
                <FormControlLabel
                  className={FormManagerStyles.RadioOption}
                  value="medical-staff"
                  control={<Radio />}
                  label="צוות רפואי"
                />
                <FormControlLabel
                  className={FormManagerStyles.RadioOption}
                  value="other"
                  control={<Radio />}
                  label="אחר"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={FormManagerStyles.specificSector}>
            <FormControl
              className={FormManagerStyles.sectorRadioContainer}
              component="fieldset"
            >
              <FormLabel component="legend" style={{ color: "black" }}>
                סקטור
              </FormLabel>
              <RadioGroup
                aria-label="סקטור"
                name="sector"
                value={this.state.specificSectorValue}
                onChange={this.specificSectorhandleChange}
              >
                <FormControlLabel
                  className={FormManagerStyles.RadioOption}
                  value="medicine"
                  control={<Radio />}
                  label="רפואה"
                />
                <FormControlLabel
                  className={FormManagerStyles.RadioOption}
                  value="pharmacy"
                  control={<Radio />}
                  label="רוקחות"
                />
                <FormControlLabel
                  className={FormManagerStyles.RadioOption}
                  value="Nursing"
                  control={<Radio />}
                  label="סיעוד"
                />
              </RadioGroup>
            </FormControl>
          </div>
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
