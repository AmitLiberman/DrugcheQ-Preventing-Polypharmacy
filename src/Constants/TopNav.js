import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./TopNav.css";
// top navigation bar
const TopNav = (props) => {
  return (
    <div>
      <Navbar className="nav-bar" collapseOnSelect expand="lg">
        <Navbar.Toggle
          className="hamburger-nav"
          aria-controls="responsive-navbar-nav"
        />

        <Navbar.Brand className="logo-wrapper" href="/">
          <h2 className="drugheq-logo">DrugcheQ</h2>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto top-nav-content">
            <Nav.Link className="top-nav-link" href="/drug-search">
              <span className="link-text">חיפוש תרופה</span>
            </Nav.Link>
            <Nav.Link className="top-nav-link" href="/interaction-checker">
              <span className="link-text"> אינטראקציה בין תרופות</span>
            </Nav.Link>
            <Nav.Link className="top-nav-link" href="/side-effect-report">
              <span className="link-text">דיווח על תופעות לוואי</span>
            </Nav.Link>
            {/* <Nav.Link className="top-nav-link" href="/connect">
              <span className="link-text">צור קשר</span>
            </Nav.Link> */}
          </Nav>
          {/* <Nav className="ml-auto top-nav-content">
            <Nav.Link className="top-nav-link" href="/connect">
              <span className="link-text  sign-up">הרשם</span>
            </Nav.Link>
            <Nav.Link className="top-nav-link" href="/connect">
              <span className="material-icons log-in">person</span>
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TopNav;
