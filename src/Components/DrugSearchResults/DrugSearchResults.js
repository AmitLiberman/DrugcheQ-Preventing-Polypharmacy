import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import "./DrugSearchResults.css";

class DrugSearchResults extends Component {
  state = {
    drugName: "", //drug name that submited in input
  };

  render() {
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
            <Card.Body>Hello! I'm the body</Card.Body>
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
            <Card.Body>Hello! I'm the body</Card.Body>
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
