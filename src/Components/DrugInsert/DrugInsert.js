import React, { Component } from "react";
import DrugList from "../DrugList/DrugList";
import "./DrugInsert.css";
import axios from "axios";
import Autosuggest from "react-autosuggest";

class DrugInsert extends Component {
  state = {
    drugName: "", //drug name that submited in input
    drugList: [],
    response: null,
    value: "",
    suggestions: [],
    drugSuggestions: [],
    loader: false,
  };
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value) => {
    console.log("getSuggestions");

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    console.log(inputLength);

    return inputLength === 0
      ? []
      : this.state.drugSuggestions.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => suggestion.name;

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  componentDidMount = () => {
    const request = "http://127.0.0.1:5000/suggest";
    this.setState({ loading: true }, () => {
      axios
        .get(request)
        .then((response) => {
          this.setState({ interacionRes: response.data });
          this.setState({ loading: false });

          var reponseLength = Object.keys(response.data).length;
          for (let index = 0; index < reponseLength; index++) {
            this.setState({
              drugSuggestions: [
                ...this.state.drugSuggestions,
                response.data[index],
              ],
            });
          }
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
    console.log("onSuggestionsFetchRequested");
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    console.log("onSuggestionsClearRequested");
    this.setState({
      suggestions: [],
    });
  };

  //Submit Drug Item to list
  handleSubmit = (event) => {
    event.preventDefault();

    const newDrugItem = {
      id: this.state.drugList.length + 1,
      name: this.state.value,
    };
    if (newDrugItem.name.trim().length !== 0) {
      if (this.props.drugInsertHandler) {
        this.props.drugInsertHandler(true);
      }
      //if the input not contains only spaces
      this.setState({ drugList: [...this.state.drugList, newDrugItem] });
      this.setState({ value: "" });
      this.props.drugListUpdate(newDrugItem);
    }
  };
  //Change State to the drug name that typed
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  //handleInteractionCheck
  handleInteractionCheck = () => {
    alert("בודק אינטראקציה בין התרופות");
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
      <React.Fragment>
        <form className="interaction-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div>
              <button className="btn btn-success add-drug-btn" type="submit">
                + הוסף
              </button>
            </div>
            {/* <input
              onChange={this.handleChange}
              type="text"
              className="form-control input-drug-name"
              placeholder="הכנס/י שם תרופה"
              value={this.state.drugName}
              aria-label=""
              aria-describedby="basic-addon1"
            /> */}
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
          {/* change this.state.drugList to this.props.drugList will work but change 
          is needed in the paren component in interaction checker */}
          <DrugList
            delDrug={this.props.delDrug}
            drugList={this.props.drugList}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DrugInsert;
