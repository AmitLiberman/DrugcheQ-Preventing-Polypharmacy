import React from "react";
import "./BottomNav.css";

const BottomNav = (props) => {
  return (
    <div className="bottom-nav-container">
      <div className="category-wrapper actions">
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
      <div className="category-wrapper support">
        <h6 className="category-name">תמיכה</h6>
        <a className="bottom-action-nav-link" href="/connect">
          <span className="bottom-link-text">צור קשר</span>
        </a>
        <a className="bottom-action-nav-link" href="/faq">
          <span className="bottom-link-text">שאלות ותשובות</span>
        </a>
        <a className="bottom-action-nav-link" href="/terms">
          <span className="bottom-link-text">תנאי שימוש</span>
        </a>
      </div>

      <div className="category-wrapper support">
        <h6 className="category-name">משתמשים</h6>
        <a className="bottom-action-nav-link" href="/connect">
          <span className="bottom-link-text">התחבר</span>
        </a>
        <a className="bottom-action-nav-link" href="/faq">
          <span className="bottom-link-text">הרשם</span>
        </a>
      </div>
    </div>
  );
};
export default BottomNav;
