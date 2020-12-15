import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./TopNav.css";
// top navigation bar
const TopNav = (props) => {
  return (
    <div>
      <Navbar
        className="nav-bar"
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Navbar.Toggle
          className="hamburger-nav"
          aria-controls="responsive-navbar-nav"
        />

        <Navbar.Brand className="logo-wrapper" href="/">
          <h2 className="drugheq-logo">DrugcheQ</h2>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto top-nav-content">
            <Nav.Link className="top-nav-link" href="/">
              <span className="link-text">בית</span>
            </Nav.Link>
            <Nav.Link className="top-nav-link" href="/about">
              <span className="link-text">אודות</span>
            </Nav.Link>
            <Nav.Link className="top-nav-link" href="/topics">
              <span className="link-text">נושאים</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TopNav;
