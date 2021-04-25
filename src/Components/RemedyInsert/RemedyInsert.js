import React, { Component } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./RemedyInsert.css";
import RemedyList from "../RemedyList/RemedyList";

class RemedyInsert extends Component {
  state = {
    drugList: [],
    response: null,
    loading: false,
    notInList: "alert-remedy-list fadeOut",
    alertMsg: "",
    remedyList: [],
    remedyID: 0,
    validDrug: true,
    drugAdded: false,
    chooseSuggest: false,
  };

  delRemedy = (id) => {
    if (this.state.remedyList.length === 1) return;
    console.log("delete remedy id " + id);
    this.setState({
      remedyList: [
        ...this.state.remedyList.filter((remedy) => remedy.id !== id),
      ],
    });
  };

  chooseSuggestChange = (s) => {
    this.setState({ chooseSuggest: s });
  };

  isValidDrug = (valid) => {
    this.setState({ validDrug: valid });
  };

  componentDidMount = () => {
    let newRemedyItem = { id: this.state.remedyID };
    this.setState({
      remedyList: [...this.state.remedyList, newRemedyItem],
      remedyID: this.state.remedyID + 1,
    });

    const request = "https://drugcheq.herokuapp.com/suggest";
    this.setState({ loading: true }, () => {
      axios
        .get(request)
        .then((response) => {
          this.setState({ loading: false });
          this.setState({ drugSuggestions: response.data });
        })
        .catch((error) => {
          alert("error!");
        });
    });
  };

  //Submit Drug Item to list
  handleSubmit = (event) => {
    event.preventDefault();
    //   if (this.state.chooseSuggest === false) {
    //     this.setState({
    //       notInList: "alert-remedy-list fadeIn",
    //       alertMsg: "יש לבחור תרופה מתוך הרשימה",
    //     });

    //     setTimeout(() => {
    //       this.setState({
    //         notInList: "alert-remedy-list fadeOut",
    //       });
    //     }, 2000);
    //     // this.setState({ alertMsg: "" });

    //     return;
    //   }
    //   this.setState({ chooseSuggest: false });

    //   const newDrugItem = {
    //     id: this.state.drugList.length + 1,
    //     name: this.state.value,
    //   };
    //   if (newDrugItem.name.trim().length !== 0) {
    //     if (this.props.drugInsertHandler) {
    //       this.props.drugInsertHandler(true);
    //     }
    //     //if the input not contains only spaces
    //     this.setState({ drugList: [...this.state.drugList, newDrugItem] });
    //     this.setState({ value: "" });
    //     this.props.drugListUpdate(newDrugItem);
    //   }
  };
  //Change State to the drug name that typed
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onClickAdd = () => {
    console.log(this.state.validDrug);
    if (this.state.validDrug === false) return;
    if (this.state.drugAdded === false) return;
    if (this.state.chooseSuggest === false) return;
    let newRemedyItem = { id: this.state.remedyID };
    this.setState({
      remedyList: [...this.state.remedyList, newRemedyItem],
      remedyID: this.state.remedyID + 1,
      drugAdded: false,
    });
  };

  addDrug = (value, id) => {
    if (value.trim().length !== 0) {
      let newDrugItem = { name: value, id: id };
      this.setState({
        drugList: [...this.state.drugList, newDrugItem],
        drugAdded: true,
      });
    }
  };

  render() {
    let progress = (
      <div style={{ margin: "5em" }}>
        <CircularProgress />
      </div>
    );
    return this.state.loading ? (
      progress
    ) : (
      <div>
        <form className="remedy-insert-form" onSubmit={this.handleSubmit}>
          <div className={this.state.notInList}>{this.state.alertMsg}</div>
          <RemedyList
            delRemedy={this.delRemedy}
            remedies={this.state.remedyList}
            addDrug={this.addDrug}
            isValidDrug={this.isValidDrug}
            validDrug={this.state.validDrug}
            chooseSuggestChange={this.chooseSuggestChange}
          />
          <button className="add-btn" onClick={this.onClickAdd}>
            הוסף +
          </button>
        </form>
      </div>
    );
  }
}

export default RemedyInsert;
