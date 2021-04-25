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
    isChoosed: false,
    validDrug: true,
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

  choosed = (c) => {
    this.setState({ isChoosed: c });
    // this.setState({ validDrug: c });
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
    if (this.state.isChoosed === false) {
      this.setState({ validDrug: false });
      return;
    }

    console.log(this.state.remedyList.length);
    console.log(this.state.drugList.length);

    if (
      this.state.drugList.length === 0 ||
      this.state.remedyList.length !== this.state.drugList.length
    ) {
      this.setState({
        validDrug: false,
        choosed: false,
      });
      return;
    }
    let newRemedyItem = { id: this.state.remedyID };
    this.setState({
      remedyList: [...this.state.remedyList, newRemedyItem],

      remedyID: this.state.remedyID + 1,
      validDrug: true,
      choosed: false,
    });
  };

  addDrug = (value, id) => {
    if (value.trim().length !== 0) {
      let newDrugItem = { name: value, id: id };
      this.setState({ drugList: [...this.state.drugList, newDrugItem] });
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
            choosed={this.choosed}
            validDrug={this.state.validDrug}
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
