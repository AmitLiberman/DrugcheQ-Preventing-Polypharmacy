import React, { Component } from "react";
import DrugSearchResults from "../DrugSearchResults/DrugSearchResults";
import DrugSearchInput from "../DrugSearchInput/DrugSearchInput";

class DrugSearch extends Component {
  state = {
    drugData: "",
    drugUserName: "", //The name of the drug that the user inserted
  };

  getDrugData = (data, drugName) => {
    this.setState({ drugData: data, drugUserName: drugName });
  };

  render() {
    return (
      <div>
        {this.state.drugData === "" ? (
          <DrugSearchInput getDrugData={this.getDrugData} />
        ) : (
          <DrugSearchResults
            drugData={this.state.drugData}
            drugUserName={this.state.drugUserName}
          />
        )}
      </div>
    );
  }
}

export default DrugSearch;
