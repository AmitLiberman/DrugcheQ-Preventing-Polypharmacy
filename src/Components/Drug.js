import React from "react";
import "./Drug.css";

const Drug = (props) => {
  return <h3 class="drug-list-item">{props.drugName}</h3>;
};

export default Drug;
