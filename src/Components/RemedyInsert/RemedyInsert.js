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
    chooseSuggest: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  chooseSuggestChange = (s) => {
    this.setState({ chooseSuggest: s });
  };

  componentDidMount = () => {
    if (this.props.drugList.length > 0) {
      let arrDrugItems = [];
      let arrDrugList = [];

      for (let index = 0; index < this.props.drugList.length; index++) {
        let newRemedyItem = { id: index + 1 };
        let newDrug = {
          id: index + 1,
          name: this.props.drugList[index].name,
          fromDate: this.props.drugList[index].fromDate,
          untilDate: this.props.drugList[index].untilDate,
        };
        console.log(newRemedyItem);
        arrDrugItems.push(newRemedyItem);
        arrDrugList.push(newDrug);
      }
      this.setState({
        drugItems: arrDrugItems,
        drugList: arrDrugList,
      });
      this.props.updateDrugListIds(arrDrugList);
    } else {
      let newRemedyItem = { id: this.state.drugItems.length + 1 };
      this.setState({
        drugItems: [...this.state.drugItems, newRemedyItem],
      });
    }
  };

  onClickAdd = () => {
    // if (this.state.chooseSuggest === false) return;
    let newRemedyItem = { id: this.state.drugItems.length + 1 };

    this.setState({
      drugItems: [...this.state.drugItems, newRemedyItem],
    });
  };

  onClickDelete = (id) => {
    if (this.state.drugItems.length === 1) return;
    this.setState(
      {
        drugItems: [...this.state.drugItems.filter((item) => item.id !== id)],
        drugList: [...this.props.drugList.filter((drug) => drug.id !== id)],
      },
      this.props.drugListDeleteItem(id)
    );
  };

  getDrugFromDates = (id, value) => {
    for (let index = 0; index < this.props.drugList.length; index++) {
      const drugId = this.props.drugList[index].id;
      if (id === drugId) {
        const newIds = this.props.drugList.slice();
        newIds[index].fromDate = value;
        this.setState({ drugList: newIds });
      }
    }
  };
  getDrugUntilDates = (id, value) => {
    for (let index = 0; index < this.props.drugList.length; index++) {
      const drugId = this.props.drugList[index].id;
      if (id === drugId) {
        const newIds = this.props.drugList.slice();
        newIds[index].untilDate = value;
        this.setState({ drugList: newIds });
      }
    }
  };

  getDrugValue = (drugValue, id) => {
    let found = false;
    for (let index = 0; index < this.props.drugList.length; index++) {
      const drugId = this.props.drugList[index].id;
      if (id === drugId) {
        const newIds = this.props.drugList.slice();
        newIds[index].name = drugValue;
        this.setState({ drugList: newIds });
        found = true;
        console.log("found!");
        break;
      }
    }

    if (found === false) {
      console.log("Not found!");
      console.log(this.props.drugList);
      this.setState({ drugValue: drugValue });
      const newDrugItem = {
        id: this.props.drugList.length + 1,
        name: drugValue,
        fromDate: "",
        untilDate: "",
      };
      this.setState(
        {
          drugList: [...this.props.drugList, newDrugItem],
          drugValue: "",
          chooseSuggest: false,
        },
        this.props.drugListUpdate(newDrugItem)
      );
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
            drugitems={this.state.drugItems}
            drugList={this.props.drugList}
            getDrugValue={this.getDrugValue}
            chooseSuggestChange={this.chooseSuggestChange}
            onClickDelete={this.onClickDelete}
            getDrugFromDates={this.getDrugFromDates}
            getDrugUntilDates={this.getDrugUntilDates}
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
