import React, { Component } from "react";
import "./ModalBox.css";

class ModalBox extends Component {
  render() {
    return (
      <div className="modal-box-container">
        <div className="modal-content-text">
          <span className="close-modal-box">&times;</span>
          <p>Some text in the box</p>
        </div>
      </div>
    );
  }
}

export default ModalBox;
