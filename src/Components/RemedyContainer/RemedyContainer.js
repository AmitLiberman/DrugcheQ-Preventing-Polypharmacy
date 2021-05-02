import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import "./RemedyContainer.css";

class RemedyContainer extends Component {
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
    this.props.getDrugValue(suggestion.name, this.props.remedyItem.id);
    this.props.chooseSuggestChange(true);

    return suggestion.name;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  componentDidMount = () => {
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
    this.props.chooseSuggestChange(false);
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

  fromChangeHandler = (event) => {
    this.props.getDrugFromDates(this.props.remedyItem.id, event.target.value);
  };

  untilChangeHandler = (event) => {
    this.props.getDrugUntilDates(this.props.remedyItem.id, event.target.value);
  };

  onClickX = () => {
    this.props.onClickDelete(this.props.remedyItem.id);
    this.props.chooseSuggestChange(true);
  };

  render() {
    let found = false;
    let value = "";

    console.log(
      "drug items",
      this.props.drugitems.length,
      this.props.drugitems
    );
    console.log("drug List", this.props.drugList.length, this.props.drugList);

    for (let index = 0; index < this.props.drugList.length; index++) {
      const drugId = this.props.drugList[index].id;
      if (this.props.remedyItem.id === drugId) {
        value = this.props.drugList[index].name;
        console.log(value);
        found = true;
        break;
      }
    }
    if (found === false) {
      value = this.state.value;
      console.log(value);
    }
    const suggestions = this.state.suggestions;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "בחר תרופה",
      value,
      onChange: this.onChange,
    };

    const notValidDrugMsg = (
      <h6 style={{ color: "red" }}>אנא בחר תרופה המרשימה * </h6>
    );
    return (
      <div className="remedy-element-container">
        <div className="delete-remedy-btn-wrapper">
          <button className="delete-remedy-btn" onClick={this.onClickX}>
            X
          </button>
        </div>
        <label className="step2-lable" htmlFor="drug-name">
          שם התרופה
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
          <div className="date-wrapper1">
            <label className="date-lable" htmlfor="fromDrugName">
              תאריך תחילת שימוש
            </label>
            <input
              className="date-input"
              type="date"
              id="fromDrugName"
              name="fromDrugName"
              onChange={(e) => this.fromChangeHandler(e)}
            />
          </div>
          <div className="date-wrapper1">
            <label className="date-lable" htmlfor="untilDrugName">
              תאריך סיום שימוש
            </label>
            <input
              className="date-input"
              type="date"
              id="untilDrugName"
              name="untilDrugName"
              onChange={(e) => this.untilChangeHandler(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RemedyContainer;
