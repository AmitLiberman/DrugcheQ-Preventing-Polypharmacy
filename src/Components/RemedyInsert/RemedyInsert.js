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
    let newRemedyItem = { id: this.state.drugItems.length + 1 };
    this.setState({
      drugItems: [...this.state.drugItems, newRemedyItem],
    });
  };

  onClickAdd = () => {
    if (this.state.chooseSuggest === false) return;
    let newRemedyItem = { id: this.state.drugItems.length + 1 };

    this.setState({
      drugItems: [...this.state.drugItems, newRemedyItem],
    });
  };
  onClickDelete = (id, drugName) => {
    if (this.state.drugItems.length === 1) return;
    this.setState(
      {
        drugItems: [...this.state.drugItems.filter((item) => item.id !== id)],
        drugList: [...this.state.drugList.filter((drug) => drug.id !== id)],
      },
      this.props.drugListDeleteItem(id)
    );
  };

  getDrugValue = (drugValue, id) => {
    let found = false;
    for (let index = 0; index < this.state.drugList.length; index++) {
      const drugId = this.state.drugList[index].id;
      console.log(drugId, id);
      if (id === drugId) {
        const newIds = this.state.drugList.slice();
        newIds[index].name = drugValue;
        this.setState({ drugList: newIds });
        found = true;
        break;
      }
    }
    if (found === false) {
      this.setState({ drugValue: drugValue });
      const newDrugItem = {
        id: this.state.drugList.length + 1,
        name: drugValue,
      };
      this.setState(
        {
          drugList: [...this.state.drugList, newDrugItem],
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
