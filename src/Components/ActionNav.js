import React from "react";
import "./ActionNav.css";
import { Nav } from "react-bootstrap";

const ActionNav = (props) => {
  return (
    <div className="action-nav-wrapper">
      <div className="action-opt">
        <Nav.Link href="/drug-search">
          <span className="action-text"> חיפוש תרופה</span>
        </Nav.Link>
      </div>
      <div className="action-opt">
        <Nav.Link href="/interaction-checker">
          <span className="action-text">בדיקת אינטראקציה</span>
        </Nav.Link>
      </div>
      <div className="action-opt">
        <Nav.Link href="/side-effect-report">
          <span className="action-text">דיווח על תופעות לוואי</span>
        </Nav.Link>
      </div>
    </div>
  );
};
export default ActionNav;
