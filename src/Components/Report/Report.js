import React, { Component } from "react";
import "./Report.css";
import DrugList from "../DrugList/DrugList";
import Autosuggest from "react-autosuggest";
import symptomsJson from "./symptoms.json";

class Report extends Component {
  state = {
    conditionName: "", //condition name that submited in input
    conditionsList: [],
    drugList: [],
    suggestions: [],
    chooseSuggest: false,
    alertMsg: "",
    value: "",
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
      chooseSuggest: false,
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : symptomsJson.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    this.setState({ chooseSuggest: true });
    return suggestion.name;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  //Submit condition Item to list
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.chooseSuggest === false) {
      this.setState({
        notInList: "alert-drug-list fadeIn",
        alertMsg: "יש לבחור תרופה מתוך הרשימה",
      });

      setTimeout(() => {
        this.setState({
          notInList: "alert-drug-list fadeOut",
        });
      }, 2000);
      // this.setState({ alertMsg: "" });

      return;
    }
    const newConditionItem = {
      id: this.state.conditionsList.length + 1,
      name: this.state.value,
    };
    if (newConditionItem.name.trim().length !== 0) {
      if (this.props.symptomInsertHandler)
        this.props.symptomInsertHandler(true);

      //if the input not contains only spaces
      this.setState({
        conditionsList: [...this.state.conditionsList, newConditionItem],
      });
      this.setState({ value: "" });
      this.props.symptomListUpdate(newConditionItem);
    }
  };
  //Change State to the condition name that typed
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "הכנס שם תסמין",
      value,
      onChange: this.onChange,
    };

    return (
      <React.Fragment>
        <div
          className={this.state.notInList}
          style={{ textAlign: "center", marginBottom: "0.8em" }}
        >
          {this.state.alertMsg}
        </div>

        <form className="interaction-form" onSubmit={this.handleSubmit}>
          <div class="input-group mb-3" style={{ textAlign: "right" }}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
            <div>
              <button
                className="btn btn-primary add-drug-to-list"
                type="submit"
              >
                הוסף +
              </button>
            </div>
          </div>
        </form>

        <div className="drug-list-container">
          <DrugList
            delDrug={this.props.symptomListDeleteItem}
            drugList={this.props.conditionsList}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Report;
