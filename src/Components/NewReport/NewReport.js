import React, { Component } from "react";
import NewReportStyles from "./NewReport.module.css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FormManager from "./FormManger.js";

class NewReport extends Component {
  state = {
    continueClicked: false,
  };
  onClickContinue = () => {
    this.setState({ continueClicked: true });
  };

  render() {
    let formHomePage = (
      <div className={NewReportStyles.header}>
        <h2 className={NewReportStyles.title}>דיווח תופעות לוואי</h2>
        <p>
          <InfoOutlinedIcon className={NewReportStyles.infoIcon} />
          יש למלא את כל שדות החובה בטופס.
        </p>
        <p>
          <InfoOutlinedIcon className={NewReportStyles.infoIcon} />
          לצורך שמירה על פרטיותכם, ניתן למלא את הטופס בצורה אנונימית.
        </p>

        <p>
          <InfoOutlinedIcon className={NewReportStyles.infoIcon} /> טופס זה
          מנוסח בלשון זכר אך פונה לנשים וגברים כאחד.
        </p>
        <p>
          <button onClick={this.onClickContinue}>המשך</button>
        </p>
      </div>
    );

    return (
      <div>{this.state.continueClicked ? <FormManager /> : formHomePage}</div>
    );
  }
}

export default NewReport;
