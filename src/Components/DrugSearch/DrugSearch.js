import React, { Component } from "react";
import DrugSearchResults from "../DrugSearchResults/DrugSearchResults";
import DrugSearchInput from "../DrugSearchInput/DrugSearchInput";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./DrugSearch.css";

class DrugSearch extends Component {
  state = {
    drugData: "",
    drugUserName: "", //The name of the drug that the user inserted
    loading: false,
  };

  getDrugData = (data, drugName) => {
    this.setState({ drugData: data, drugUserName: drugName });
  };

  isLoading = (sloading) => {
    this.setState({ loading: sloading });
  };

  render() {
    let progress = (
      <div className="progress-search">
        <h2 className="progress-search-headline">.. מחפש תרופה </h2>
        <CircularProgress />
      </div>
    );

    let searchShow = "";
    if (this.state.loading) searchShow = progress;
    else if (this.state.drugUserName === "")
      searchShow = (
        <DrugSearchInput
          getDrugData={this.getDrugData}
          isLoading={this.isLoading}
        />
      );
    else
      searchShow = (
        <DrugSearchResults
          drugData={this.state.drugData}
          drugUserName={this.state.drugUserName}
        />
      );

    return <div>{searchShow}</div>;
  }
}

export default DrugSearch;
