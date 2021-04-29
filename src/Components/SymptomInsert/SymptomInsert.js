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
    chooseSuggest: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  chooseSuggestChange = (s) => {
    this.setState({ chooseSuggest: s });
  };

  componentDidMount = () => {
    let newRemedyItem = { id: this.state.symptomItems.length + 1 };
    this.setState({
      symptomItems: [...this.state.symptomItems, newRemedyItem],
    });
  };

  onClickAdd = () => {
    if (this.state.chooseSuggest === false) return;
    let newRemedyItem = { id: this.state.symptomItems.length + 1 };

    this.setState({
      symptomItems: [...this.state.symptomItems, newRemedyItem],
    });
  };
  onClickDelete = (id) => {
    if (this.state.symptomItems.length === 1) return;
    this.setState(
      {
        symptomItems: [
          ...this.state.symptomItems.filter((item) => item.id !== id),
        ],
        symptomList: [
          ...this.state.symptomList.filter((symptom) => symptom.id !== id),
        ],
      },
      this.props.symptomListDeleteItem(id)
    );
  };

  getSymptomAppearDate = (id, value) => {
    for (let index = 0; index < this.state.symptomList.length; index++) {
      const symptomId = this.state.symptomList[index].id;
      if (id === symptomId) {
        const newIds = this.state.symptomList.slice();
        newIds[index].appearDate = value;
        this.setState({ symptomList: newIds });
      }
    }
  };
  getSymptomSeverity = (id, value) => {
    for (let index = 0; index < this.state.symptomList.length; index++) {
      const symptomId = this.state.symptomList[index].id;
      if (id === symptomId) {
        const newIds = this.state.symptomList.slice();
        newIds[index].severity = value;
        this.setState({ symptomList: newIds });
      }
    }
  };

  getSymptomValue = (symptomValue, id) => {
    let found = false;
    for (let index = 0; index < this.state.symptomList.length; index++) {
      const symptomId = this.state.symptomList[index].id;
      if (id === symptomId) {
        const newIds = this.state.symptomList.slice();
        newIds[index].name = symptomValue;
        this.setState({ symptomList: newIds });
        found = true;
        break;
      }
    }
    if (found === false) {
      this.setState({ symptomValue: symptomValue });
      const newSymptomIdItem = {
        id: this.state.symptomList.length + 1,
        name: symptomValue,
        severity: "",
        appearDate: "",
      };
      this.setState(
        {
          symptomList: [...this.state.symptomList, newSymptomIdItem],
          symptomValue: "",
          chooseSuggest: false,
        },
        this.props.symptomListUpdate(newSymptomIdItem)
      );
    }
  };

  render() {
    return (
      <div>
        <form className="remedy-insert-form" onSubmit={this.handleSubmit}>
          <div className={this.state.notInList}>{this.state.alertMsg}</div>
          <SymptomList
            symptomItems={this.state.symptomItems}
            chooseSuggestChange={this.chooseSuggestChange}
            onClickDelete={this.onClickDelete}
            getSymptomValue={this.getSymptomValue}
            getSymptomSeverity={this.getSymptomSeverity}
            getSymptomAppearDate={this.getSymptomAppearDate}
          />
          <button className="add-btn" onClick={this.onClickAdd}>
            הוסף +
          </button>
        </form>
      </div>
    );
  }
}

export default SymptomInsert;
