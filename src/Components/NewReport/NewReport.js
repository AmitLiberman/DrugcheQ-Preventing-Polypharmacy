import React, { Component } from "react";
import NewReportStyles from "./NewReport.module.css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

class NewReport extends Component {
  render() {
    return (
      <div>
        <div className={NewReportStyles.header}>
          <h2 className={NewReportStyles.title}>דיווח תופעות לוואי</h2>
          <p>
            <InfoOutlinedIcon className={NewReportStyles.infoIcon} />
            יש למלא את כל שדות החובה בטופס.
          </p>
          <p>
            <InfoOutlinedIcon className={NewReportStyles.infoIcon} />
            לצורך שמירה על פרטיותכם, ניתן להזין למלא את הטופס בצורה אנונימית.
          </p>

          <p>
            <InfoOutlinedIcon className={NewReportStyles.infoIcon} /> טופס זה
            מנוסח בלשון זכר אך פונה לנשים וגברים כאחד.
          </p>
          <p>
            <button>המשך</button>
          </p>
        </div>
      </div>
    );
  }
}

export default NewReport;
