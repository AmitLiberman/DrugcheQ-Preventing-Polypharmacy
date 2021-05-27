import React, { Component } from "react";
import "./NewDrugModal.css";

class NewDrugModal extends Component {
  onClickHandle = () => {
    this.props.closeModalClicked();
  };
  render() {
    return (
      <div
        className="modal-box-container"
        style={{ display: this.props.ModalBoxDisplay }}
      >
        <div className="modal-content-text">
          <span className="close-modal-box" onClick={this.onClickHandle}>
            &times;
          </span>
          <h5> הנתונים נקלטו במערכת</h5>
          <h5>פרטי התרופה יאומתו ויעודכנו ברשימת התרופות בקרוב</h5>
          <h5>אנו מודים לכם על הדיווח</h5>
        </div>
      </div>
    );
  }
}

export default NewDrugModal;
