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
    counter: 0,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  chooseSuggestChange = (s) => {
    this.setState({ chooseSuggest: s });
  };

  componentDidMount = () => {
    if (this.props.symptomList.length > 0) {
      let arrSymptomItems = [];
      let arrSymptomList = [];

      for (let index = 0; index < this.props.symptomList.length; index++) {
        let newSymptomItem = { id: index + 1 };
        let newSymptom = {
          id: index + 1,
          name: this.props.symptomList[index].name,
          severity: this.props.symptomList[index].severity,
          appearDate: this.props.symptomList[index].appearDate,
        };
        arrSymptomItems.push(newSymptomItem);
        arrSymptomList.push(newSymptom);
      }
      this.setState({
        symptomItems: arrSymptomItems,
        symptomList: arrSymptomList,
      });
      this.props.updateSymptomListIds(arrSymptomList);
    } else {
      let newSymptomItem = { id: this.state.symptomItems.length + 1 };
      this.setState({
        symptomItems: [...this.state.symptomItems, newSymptomItem],
      });
    }
  };

  onClickAdd = () => {
    // if (this.state.chooseSuggest === false) return;
    let newSymptomItem = { id: this.state.symptomItems.length + 1 };

    this.setState({
      symptomItems: [...this.state.symptomItems, newSymptomItem],
    });
  };

  rerender = () => {
    this.forceUpdate();
  };
  forceUpdate = () => {
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
  };
  onClickDelete = (id) => {
    if (this.state.symptomItems.length === 1) return;
    this.setState(
      {
        symptomItems: [
          ...this.state.symptomItems.filter((item) => item.id !== id),
        ],
        symptomList: [
          ...this.props.symptomList.filter((symptom) => symptom.id !== id),
        ],
      },
      () => {
        this.props.symptomListDeleteItem(id);
        this.rerender();
      }
    );
  };

  getSymptomAppearDate = (id, value) => {
    for (let index = 0; index < this.props.symptomList.length; index++) {
      const symptomId = this.props.symptomList[index].id;
      if (id === symptomId) {
        const newIds = this.props.symptomList.slice();
        newIds[index].appearDate = value;
        this.setState({ symptomList: newIds });
      }
    }
  };
  getSymptomSeverity = (id, value) => {
    for (let index = 0; index < this.props.symptomList.length; index++) {
      const symptomId = this.props.symptomList[index].id;
      if (id === symptomId) {
        const newIds = this.props.symptomList.slice();
        newIds[index].severity = value;
        this.setState({ symptomList: newIds });
      }
    }
  };

  getSymptomValue = (symptomValue, id) => {
    let found = false;
    for (let index = 0; index < this.props.symptomList.length; index++) {
      const symptomId = this.props.symptomList[index].id;
      if (id === symptomId) {
        const newIds = this.props.symptomList.slice();
        newIds[index].name = symptomValue;
        this.setState({ symptomList: newIds });
        found = true;
        break;
      }
    }
    if (found === false) {
      this.setState({ symptomValue: symptomValue });
      const newSymptomIdItem = {
        id: this.props.symptomList.length + 1,
        name: symptomValue,
        severity: "",
        appearDate: "",
      };
      this.setState(
        {
          symptomList: [...this.props.symptomList, newSymptomIdItem],
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
            key={this.state.counter}
            symptomItems={this.state.symptomItems}
            symptomList={this.props.symptomList}
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
