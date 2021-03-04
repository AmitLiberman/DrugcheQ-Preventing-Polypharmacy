import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import "./DrugSearchResults.css";

class DrugSearchResults extends Component {
  state = {
    drugName: "", //drug name that submited in input
    drugHebrewName: "",
    drugEnglishName: "",
    ingredients: "",
    remedyNumber: "",
    takingForm: "",
    dosageForm: "",
    prescription: "",
    healthBasket: "",
    details: "",
  };

  componentDidMount = () => {
    let drugData = this.props.drugData;
    this.setState({
      drugHebrewName: drugData.drug_hebrew_name,
      drugEnglishName: drugData.drug_english_name,
      ingredients: drugData.ingredients,
      remedyNumber: drugData.remedy_number,
      takingForm: drugData.taking_form,
      dosageForm: drugData.dosage_form,
      prescription: drugData.prescription,
      healthBasket: drugData.health_basket,
      details: drugData.details,
    });
  };

  render() {
    let remedyInformation = (
      <div className="remedy-information">
        <h6>שם בעברית: {this.state.drugHebrewName}</h6>
        <h6>שם באנגלית: {this.state.drugEnglishName}</h6>
        <h6>מספר תרופה: {this.state.remedyNumber}</h6>
        <h6>דרך מתן: {this.state.takingForm}</h6>
        <h6>צורת מינון: {this.state.dosageForm}</h6>
        <h6> מרשם: {this.state.dosageForm}</h6>
        <h6> סל תרופות: {this.state.healthBasket}</h6>
      </div>
    );

    return (
      <Accordion>
        <Card className="card">
          <Accordion.Toggle
            as={Card.Header}
            className="accordion-name"
            eventKey="0"
          >
            פרטי תכשיר
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
            התוויה
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>{this.state.details}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            className="accordion-name"
            eventKey="2"
          >
            אינטראקציות
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
            דיווחים
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default DrugSearchResults;
