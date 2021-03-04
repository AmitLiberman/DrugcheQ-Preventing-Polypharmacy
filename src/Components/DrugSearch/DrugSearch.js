import React, { Component } from "react";
import DrugSearchResults from "../DrugSearchResults/DrugSearchResults";
import DrugSearchInput from "../DrugSearchInput/DrugSearchInput";

class DrugSearch extends Component {
  render() {
    return (
      <div>
        <DrugSearchInput />
        <DrugSearchResults />
      </div>
    );
  }
}

export default DrugSearch;
