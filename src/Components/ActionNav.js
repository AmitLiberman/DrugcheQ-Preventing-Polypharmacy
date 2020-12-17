import React from "react";
import "./ActionNav.css";

const ActionNav = (props) => {
  return (
    <div className="action-nav-wrapper">
      <a className="action-nav-link" href="/drug-search">
        <div className="action-opt">
          <span className="action-text"> חיפוש תרופה</span>
        </div>
      </a>
      <a className="action-nav-link" href="/interaction-checker">
        <div className="action-opt">
          <span className="action-text">בדיקת אינטראקציה</span>
        </div>
      </a>

      <a className="action-nav-link" href="/side-effect-report">
        <div className="action-opt">
          <span className="action-text">דיווח על תופעות לוואי</span>
        </div>
      </a>
    </div>
  );
};
export default ActionNav;
