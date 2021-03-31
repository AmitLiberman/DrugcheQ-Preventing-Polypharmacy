import React, { Component } from "react";
import DrugList from "../DrugList/DrugList";
import "./DrugInsert.css";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import CircularProgress from "@material-ui/core/CircularProgress";

class DrugInsert extends Component {
  state = {
    drugList: [],
    response: null,
    value: "",
    suggestions: [],
    drugSuggestions: [],
    loading: false,
    chooseSuggest: false,
    notInList: "alert-drug-list fadeOut",
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
    return suggestion.name;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

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

  //Submit Drug Item to list
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

    let progress = (
      <div style={{ margin: "3em" }}>
        <CircularProgress />
      </div>
    );
    return this.state.loading ? (
      progress
    ) : (
      <div>
        <div className="interaction-describe-container">
          <h2>בדיקת אינטראקציה בין תרופות</h2>
          <p>
            התחל להקליד שם תרופה ובחר את ההתאמה הטובה ביותר מרשימת ההצעות. חזור
            על התהליך כדי להוסיף מספר תרופות.<br></br> לאחר השלמת הרשימה שלך,
            תוכל לבדוק אם קיימת אינטראקציה באופן מיידי או לשמור את הרשימה שלך
            לבדיקה עתידית.
          </p>
        </div>
        {/* <div className={this.state.notInList}>יש לבחור תרופה מתוך הרשימה</div> ש להזין לפחות 2 תרופות */}
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

        <div className="drug-list-container">
          <div className={this.props.notInList}>{this.props.twoDrugsMsg}</div>
          {/* change this.state.drugList to this.props.drugList will work but change 
          is needed in the paren component in interaction checker */}
          <DrugList
            delDrug={this.props.delDrug}
            drugList={this.props.drugList}
          />
        </div>
      </div>
    );
  }
}

export default DrugInsert;
