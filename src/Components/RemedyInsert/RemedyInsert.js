import React, { Component } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./RemedyInsert.css";
import RemedyList from "../RemedyList/RemedyList";

class RemedyInsert extends Component {
  state = {
    drugList: [],
    drugValue: "",
    response: null,
    loading: false,
    notInList: "alert-remedy-list fadeOut",
    alertMsg: "",
    drugItems: [],
    drugItemsID: 0,
    validDrug: true,
    drugAdded: false,
    chooseSuggest: false,
  };

  // delRemedy = (id) => {
  //   if (this.state.drugItems.length === 1) return;
  //   this.setState({
  //     drugItems: [...this.state.drugItems.filter((remedy) => remedy.id !== id)],
  //   });
  // };

  // chooseSuggestChange = (s) => {
  //   this.setState({ chooseSuggest: s });
  // };

  // onDrugAdded = (s) => {
  //   this.setState({ drugAdded: s });
  // };

  // isValidDrug = (valid) => {
  //   this.setState({ validDrug: valid });
  // };

  // componentDidMount = () => {
  //   let newRemedyItem = { id: this.state.remedyID };
  //   this.setState({
  //     drugItems: [...this.state.drugItems, newRemedyItem],
  //     remedyID: this.state.remedyID + 1,
  //   });

  //   const request = "https://drugcheq.herokuapp.com/suggest";
  //   this.setState({ loading: true }, () => {
  //     axios
  //       .get(request)
  //       .then((response) => {
  //         this.setState({ loading: false });
  //         this.setState({ drugSuggestions: response.data });
  //       })
  //       .catch((error) => {
  //         alert("error!");
  //       });
  //   });
  // };

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

  // onClickAdd = () => {
  //   console.log(this.state.validDrug);
  //   console.log(this.state.drugAdded);
  //   console.log(this.state.chooseSuggest);

  //   if (this.state.validDrug === false) return;
  //   if (this.state.drugAdded === false) return;
  //   if (this.state.chooseSuggest === false) return;
  //   let newRemedyItem = { id: this.state.remedyID };
  //   this.setState({
  //     drugItems: [...this.state.drugItems, newRemedyItem],
  //     remedyID: this.state.remedyID + 1,
  //     drugAdded: false,
  //   });
  // };

  // addDrug = (value, id) => {
  //   if (value.trim().length !== 0) {
  //     let newDrugItem = { name: value, id: id };
  //     this.setState({
  //       drugList: [...this.state.drugList, newDrugItem],
  //       drugAdded: true,
  //     });
  //     this.props.drugListUpdate(newDrugItem);
  //   }
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
    if (this.state.drugValue.trim().length === 0) return;
    if (this.state.chooseSuggest === false) return;
    let newRemedyItem = { id: this.state.drugItemsID };
    this.setState({
      drugItems: [...this.state.drugItems, newRemedyItem],
      drugItemsID: this.state.drugItemsID + 1,
      drugList: [...this.state.drugList, this.state.drugValue],
      drugValue: "",
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
            // delRemedy={this.delRemedy}
            drugitems={this.state.drugItems}
            getDrugValue={this.getDrugValue}
            // addDrug={this.addDrug}
            // isValidDrug={this.isValidDrug}
            // validDrug={this.state.validDrug}
            chooseSuggestChange={this.chooseSuggestChange}
            // onDrugAdded={this.onDrugAdded}
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
