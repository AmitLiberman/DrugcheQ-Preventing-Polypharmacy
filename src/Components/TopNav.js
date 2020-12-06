import React from "react";
import { Nav, Navbar } from "react-bootstrap";

// TO DO
// Replace the inline style with style-component

const TopNav = (props) => {
  return (
    <div>
      <Navbar
        style={{ direction: "rtl" }}
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Navbar.Brand href="/">DrugcheQ</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ marginRight: "20px" }} className="ml-auto">
            <Nav.Link href="/">בית</Nav.Link>
            <Nav.Link href="/about">אודות</Nav.Link>
            <Nav.Link href="/topics">נושאים</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TopNav;
