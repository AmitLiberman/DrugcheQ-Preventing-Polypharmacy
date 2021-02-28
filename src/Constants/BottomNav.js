import React from "react";
import "./BottomNav.css";

const BottomNav = (props) => {
  return (
    <div className="bottom-nav-container">
      <div className="action-categories ">
        <h6 className="category-name">פעולות</h6>
        <a className="bottom-action-nav-link" href="/drug-search">
          <span className="bottom-link-text"> חיפוש תרופה</span>
        </a>
        <a className="bottom-action-nav-link" href="/interaction-checker">
          <span className="bottom-link-text">בדיקת אינטראקציה</span>
        </a>
        <a className="bottom-action-nav-link" href="/side-effect-report">
          <span className="bottom-link-text">דיווח על תופעות לוואי</span>
        </a>
      </div>
    </div>
  );
};
export default BottomNav;
