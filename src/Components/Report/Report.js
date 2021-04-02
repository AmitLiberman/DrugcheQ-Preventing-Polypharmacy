import React, { Component } from "react";
import "./Report.css";
import DrugList from "../DrugList/DrugList";
import Autosuggest from "react-autosuggest";

class Report extends Component {
  state = {
    conditionName: "", //condition name that submited in input
    conditionsList: [],
    drugList: [],
    suggestions: [],
    value: "",
    symptoms: [
      { name: "כאב ראש" },
      { name: "קשיי נשימה" },
      { name: "נפיחות בפנים" },
      { name: "נמנום" },
      { name: "בחילה" },
      { name: "סחרחורת" },
      { name: "עייפות" },
      { name: "ישנוניות" },
      { name: "קשיי הירדמות" },
      { name: "דפיקות לב מהירות" },
      { name: "שלשול" },
      { name: " פריחה בעור" },
      { name: "גרד" },
      { name: "לחץ בחזה" },
    ],
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
      : this.state.symptoms.filter(
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
    console.log("report is rendering");
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "הכנס שם תסמין",
      value,
      onChange: this.onChange,
    };
    console.log("report is rendering2");

    return (
      <React.Fragment>
        <form className="side-effect-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-info add-side-effect-btn"
                type="submit"
              >
                + הוסף
              </button>
            </div>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
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
