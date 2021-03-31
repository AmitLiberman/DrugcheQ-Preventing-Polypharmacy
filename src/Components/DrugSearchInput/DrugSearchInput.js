import React, { Component } from "react";
import "./DrugSearchInput.css";
import axios from "axios";
import Autosuggest from "react-autosuggest";

class DrugSearchInput extends Component {
  state = {
    drugName: "", //drug name that submited in input
    searchResponse: "",
    interacionRes: "",
    value: "",
    suggestions: [],
    drugSuggestions: [],
    chooseSuggest: false,
    notInList: "alert-drug-list fadeOut",
    alertMsg: "",
  };

  componentDidMount = () => {
    const request = "http://127.0.0.1:5000/suggest";
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
      : this.state.drugSuggestions.filter(
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

  //Change State to the drug name that typed
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  //asfdsa
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
    this.setState({ chooseSuggest: false });
    let request = "http://127.0.0.1:5000/drug-search?";
    request += this.state.value;
    this.props.isLoading(true);

    axios
      .get(request)
      .then((response) => {
        console.log(response.data);
        this.props.getDrugData(response.data, this.state.value);
        this.props.isLoading(false);
      })
      .catch((error) => {
        alert("error!");
      });
  };
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "הכנס שם תרופה",
      value,
      onChange: this.onChange,
    };
    return (
      <div className="drug-search-container">
        <div className="drug-search-describe-container">
          <h2>חיפוש תרופה</h2>
          <p>התחל להקליד שם תרופה ובחר את ההתאמה הטובה ביותר מרשימת ההצעות.</p>
        </div>
        {/* <form className="search-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-info add-drug-btn" type="submit">
                חיפוש
              </button>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control input-drug-name-search"
              placeholder="הכנס/י שם תרופה"
              value={this.state.drugName}
              aria-label=""
              aria-describedby="basic-addon1"
            />
          </div>
        </form> */}
        <div className={this.state.notInList}>{this.state.alertMsg}</div>

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
      </div>
    );
  }
}

export default DrugSearchInput;
