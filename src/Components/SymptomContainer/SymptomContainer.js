import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import "./SymptomContainer.css";

class SymptomContainer extends Component {
  state = {
    response: null,
    value: "",
    suggestions: [],
    drugSuggestions: [],
    loading: false,
    chooseSuggest: false,
    notInList: "alert-remedy-list fadeOut",
    alertMsg: "",
  };
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : this.state.drugSuggestions.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    this.setState({ chooseSuggest: true });
    // this.props.getDrugValue(suggestion.name);
    // this.props.chooseSuggestChange(true);

    return suggestion.name;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

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
    // this.props.chooseSuggestChange(false);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  //Change State to the drug name that typed
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onClickX = () => {
    // const { id } = this.props.remedyItem;
    // this.props.onClickDelete(id, this.state.value);
    // this.props.chooseSuggestChange(true);
  };
  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "בחר תסמין",
      value,
      onChange: this.onChange,
    };

    const notValidDrugMsg = (
      <h6 style={{ color: "red" }}>אנא בחר תסמין המרשימה * </h6>
    );
    return (
      <div className="remedy-element-container">
        <div className="delete-remedy-btn-wrapper">
          <button className="delete-remedy-btn" onClick={this.onClickX}>
            X
          </button>
        </div>
        <label className="step2-lable" htmlFor="drug-name">
          שם תסמין
        </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        {this.state.chooseSuggest ? null : notValidDrugMsg}

        <div className="from-until-dates-container">
          <div className="date-wrapper">
            <div className="severity-container">
              <h5>חומרתה של תופעת הלוואי</h5>
              <label className="radio-option">
                חמורה
                <input className="radio-input" type="radio" name="radio" />
              </label>
              <label className="radio-option">
                לא חמורה
                <input className="radio-input" type="radio" name="radio" />
              </label>
            </div>
            <div className="date-of-appear-container">
              <label className="date-lable" for="from-date">
                תאריך הופעת תסמין
              </label>
              <input
                className="date-input"
                type="date"
                id="from-date"
                name="from-date"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SymptomContainer;
