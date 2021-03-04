import React, { Component } from "react";
import DrugSearchResults from "../DrugSearchResults/DrugSearchResults";
import DrugSearchInput from "../DrugSearchInput/DrugSearchInput";

class DrugSearch extends Component {
  state = {
    drugData: "",
  };

  getDrugData = (data) => {
    this.setState({ drugData: data });
  };

  render() {
    return (
      <div>
        {this.state.drugData === "" ? (
          <DrugSearchInput getDrugData={this.getDrugData} />
        ) : (
          <DrugSearchResults drugData={this.state.drugData} />
        )}
      </div>
    );
  }
}

export default DrugSearch;
