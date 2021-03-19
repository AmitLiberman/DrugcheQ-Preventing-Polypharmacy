import React, { Component } from "react";
import "./ModalBox.css";

class ModalBox extends Component {
  render() {
    return (
      <div className="modal-box-container">
        <div className="modal-content-text">
          <span className="close-modal-box">&times;</span>
          <h5> הנתונים נקלטו במערכת</h5>
          <h5> תודה על הדיווח</h5>
        </div>
      </div>
    );
  }
}

export default ModalBox;
