import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import "./DrugSearchResults.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    interacionRes: [],
    loading: false,
  };

  interactionHandler = () => {
    const request =
      "https://drugcheq.herokuapp.com/check?" +
      this.props.drugData.drug_english_name;
    this.setState({ loading: true }, () => {
      axios
        .get(request)
        .then((response) => {
          const responseLength = Object.keys(response.data).length;
          for (let i = 0; i < responseLength; i++) {
            this.setState((prevState) => ({
              interacionRes: [...prevState.interacionRes, response.data[i]],
            }));
          }
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
    this.interactionHandler(drugData);
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

    const columns = [
      { dataField: "severity", text: "חומרה", sort: true },
      { dataField: "Description", text: "תיאור", sort: true },
      { dataField: "drugName", text: "שם התרופה", sort: true },
    ];

    const pagination = paginationFactory({
      page: 1,
      sizePerPage: 5,
      lastPageText: ">>",
      firstPageText: "<<",
      nextPageText: ">",
      prePageText: "<",
      showTotal: true,
      alwaysShowAllBtns: true,
      onPageChange: function (page, sizePerPage) {
        console.log("page", page);
        console.log("sizePerPage", sizePerPage);
      },
      onSizePerPageChange: function (page, sizePerPage) {
        console.log("page", page);
        console.log("sizePerPage", sizePerPage);
      },
    });
    return (
      <div>
        <h3 className="search-results-headline">
          תוצאות עבור תרופה: {this.props.drugUserName}
        </h3>
        <Accordion className="Accordion">
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
              <span className="material-icons-outlined description toggle">
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
              eventKey="3"
            >
              <span className="text">דיווחים</span>
              <span className="material-icons-outlined campaign toggle">
                campaign
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>בקרוב</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              className="accordion-name"
              eventKey="2"
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
              <Card.Body className="body-card">
                {this.state.loading ? (
                  <div>
                    <h6>... בודק אינטראקציות אפשריות</h6>
                    <CircularProgress />
                  </div>
                ) : (
                  <BootstrapTable
                    bootstrap4
                    keyField="drugName"
                    data={this.state.interacionRes}
                    columns={columns}
                    pagination={pagination}
                    rowStyle={{
                      textAlign: "center",
                      fontSize: "1rem",
                    }}
                  />
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default DrugSearchResults;
