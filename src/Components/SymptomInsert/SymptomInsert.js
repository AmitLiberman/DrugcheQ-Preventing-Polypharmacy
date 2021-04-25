import React, { Component } from "react";
import SymptomList from "../SymptomList/SymptomList";

class SymptomInsert extends Component {
  state = {
    symptomList: [],
    symptomValue: "",
    loading: false,
    notInList: "alert-remedy-list fadeOut",
    alertMsg: "",
    symptomItems: [],
    symptomItemsID: 0,
    chooseSuggest: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  chooseSuggestChange = (s) => {
    this.setState({ chooseSuggest: s });
  };

  componentDidMount = () => {
    let newRemedyItem = { id: this.state.symptomItemsID };
    this.setState({
      symptomItems: [...this.state.symptomItems, newRemedyItem],
      symptomItemsID: this.state.symptomItemsID + 1,
    });
  };

  onClickAdd = () => {
    if (this.state.chooseSuggest === false) return;

    let newRemedyItem = { id: this.state.symptomItemsID };
    this.setState({
      symptomItems: [...this.state.symptomItems, newRemedyItem],
      symptomItemsID: this.state.symptomItemsID + 1,
      symptomList: [...this.state.symptomList, this.state.symptomValue],
      symptomValue: "",
      chooseSuggest: false,
    });
    console.log(this.state.symptomList);
  };
  onClickDelete = (id, drugName) => {
    if (this.state.symptomItems.length === 1) return;
    this.setState({
      symptomItems: [
        ...this.state.symptomItems.filter((item) => item.id !== id),
      ],
      symptomList: [
        ...this.state.symptomList.filter((name) => name !== drugName),
      ],
    });
    console.log(this.state.symptomList);
  };

  getSymptomValue = (symptomValue) => {
    this.setState({ symptomValue: symptomValue });
  };

  render() {
    return (
      <div>
        <form className="remedy-insert-form" onSubmit={this.handleSubmit}>
          <div className={this.state.notInList}>{this.state.alertMsg}</div>
          <SymptomList symptomItems={this.state.symptomItems} />
          <button className="add-btn" onClick={this.onClickAdd}>
            הוסף +
          </button>
        </form>
      </div>
    );
  }
}

export default SymptomInsert;
