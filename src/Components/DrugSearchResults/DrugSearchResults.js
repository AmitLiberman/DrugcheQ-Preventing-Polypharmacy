import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import "./DrugSearchResults.css";
import axios from "axios";

class DrugSearchResults extends Component {
  state = {
    drugName: "", //drug name that submited in input
    drugHebrewName: "",
    drugEnglishName: "",
    ingredients: [],
    remedyNumber: "",
    takingForm: "",
    dosageForm: "",
    prescription: "",
    healthBasket: "",
    details: "",
    interacionRes: "",
  };

  interactionHandler = () => {
    const request = "http://127.0.0.1:5000/check?" + this.state.drugEnglishName;
    this.setState({ loading: true }, () => {
      axios
        .get(request)
        .then((response) => {
          console.log(response.data);
          this.setState({ interacionRes: response.data });
          this.setState({ loading: false });
        })
        .catch((error) => {
          alert("error!");
        });
    });
  };

  componentDidMount = () => {
    let drugData = this.props.drugData;
    this.setState({
      drugHebrewName: drugData.drug_hebrew_name,
      drugEnglishName: drugData.drug_english_name,
      ingredients: [...drugData.ingredients],
      remedyNumber: drugData.remedy_number,
      takingForm: drugData.taking_form,
      dosageForm: drugData.dosage_form,
      prescription: drugData.prescription,
      healthBasket: drugData.health_basket,
      details: drugData.details,
    });
  };

  render() {
    let ingredients = "";
    this.state.ingredients.forEach((element) => {
      ingredients += element + ", ";
    });
    ingredients = ingredients.slice(0, ingredients.length - 2);
    let remedyInformation = (
      <div className="remedy-information">
        <h6>שם בעברית: {this.state.drugHebrewName}</h6>
        <h6>שם באנגלית: {this.state.drugEnglishName}</h6>
        <h6>מספר תרופה: {this.state.remedyNumber}</h6>
        <h6>דרך מתן: {this.state.takingForm}</h6>
        <h6>צורת מינון: {this.state.dosageForm}</h6>
        <h6> מרכיבים: {ingredients}</h6>
        <h6> מרשם: {this.state.prescription}</h6>
        <h6> סל תרופות: {this.state.healthBasket}</h6>
      </div>
    );

    return (
      <div>
        <h3 className="search-results-headline">
          תוצאות עבור תרופה: {this.props.drugUserName}
        </h3>
        <Accordion>
          <Card className="card">
            <Accordion.Toggle
              as={Card.Header}
              className="accordion-name"
              eventKey="0"
            >
              <span className="text">פרטי תכשיר</span>
              <span className="material-icons-outlined  info toggle">info</span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{remedyInformation}</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              className="accordion-name"
              eventKey="1"
            >
              <span className="text">התוויה</span>
              <span class="material-icons-outlined description toggle">
                description
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="drug-details">{this.state.details}</div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              className="accordion-name"
              eventKey="2"
              onClick={this.interactionHandler}
            >
              <span className="text">אינטראקציות</span>
              <span className="material-icons-outlined medication toggle">
                medication
              </span>
              <span className="material-icons-outlined warning toggle">
                warning_amber
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              className="accordion-name"
              eventKey="3"
            >
              <span className="text">דיווחים</span>
              <span className="material-icons-outlined campaign toggle">
                campaign
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default DrugSearchResults;
