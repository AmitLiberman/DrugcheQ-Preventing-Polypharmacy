import React, { Component } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./RemedyInsert.css";
import RemedyList from "../RemedyList/RemedyList";

class RemedyInsert extends Component {
  state = {
    drugList: [],
    drugValue: "",
    loading: false,
    notInList: "alert-remedy-list fadeOut",
    alertMsg: "",
    drugItems: [],
    drugItemsID: 0,
    chooseSuggest: false,
  };

  // //Submit Drug Item to list
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   //   if (this.state.chooseSuggest === false) {
  //   //     this.setState({
  //   //       notInList: "alert-remedy-list fadeIn",
  //   //       alertMsg: "יש לבחור תרופה מתוך הרשימה",
  //   //     });

  //   //     setTimeout(() => {
  //   //       this.setState({
  //   //         notInList: "alert-remedy-list fadeOut",
  //   //       });
  //   //     }, 2000);
  //   //     // this.setState({ alertMsg: "" });

  //   //     return;
  //   //   }
  //   //   this.setState({ chooseSuggest: false });

  //   //   const newDrugItem = {
  //   //     id: this.state.drugList.length + 1,
  //   //     name: this.state.value,
  //   //   };
  //   //   if (newDrugItem.name.trim().length !== 0) {
  //   //     if (this.props.drugInsertHandler) {
  //   //       this.props.drugInsertHandler(true);
  //   //     }
  //   //     //if the input not contains only spaces
  //   //     this.setState({ drugList: [...this.state.drugList, newDrugItem] });
  //   //     this.setState({ value: "" });
  //   //     this.props.drugListUpdate(newDrugItem);
  //   //   }
  // };
  // //Change State to the drug name that typed
  // handleChange = (event) => {
  //   this.setState({ value: event.target.value });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  chooseSuggestChange = (s) => {
    this.setState({ chooseSuggest: s });
  };

  componentDidMount = () => {
    let newRemedyItem = { id: this.state.drugItemsID };
    this.setState({
      drugItems: [...this.state.drugItems, newRemedyItem],
      drugItemsID: this.state.drugItemsID + 1,
    });
  };

  onClickAdd = () => {
    if (this.state.chooseSuggest === false) return;

    let newRemedyItem = { id: this.state.drugItemsID };
    this.setState({
      drugItems: [...this.state.drugItems, newRemedyItem],
      drugItemsID: this.state.drugItemsID + 1,
      drugList: [...this.state.drugList, this.state.drugValue],
      drugValue: "",
      chooseSuggest: false,
    });
    console.log(this.state.drugList);
  };
  onClickDelete = (id, drugName) => {
    if (this.state.drugItems.length === 1) return;
    this.setState({
      drugItems: [...this.state.drugItems.filter((item) => item.id !== id)],
      drugList: [...this.state.drugList.filter((name) => name !== drugName)],
    });
    console.log(this.state.drugList);
  };

  getDrugValue = (drugValue) => {
    this.setState({ drugValue: drugValue });
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
            drugitems={this.state.drugItems}
            getDrugValue={this.getDrugValue}
            chooseSuggestChange={this.chooseSuggestChange}
            onClickDelete={this.onClickDelete}
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
