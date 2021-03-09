import React, { FunctionComponent } from "react";

// Components
import { Link } from "react-router-dom";

// Styles
import "./MenuData.scss";

const MenuData: FunctionComponent = () => {
  return (
    <div className="menu-data-container">
      <Link to="/" className="link">
        <h1 className="menu-title">Bored?</h1>
      </Link>
      <Link to="/login" className="link">
        <span className="login-open">Login?</span>
      </Link>
      <Link to="/sign-up" className="link">
        <span className="signup-open">Sign up?</span>
      </Link>
    </div>
  );
};

export default MenuData;
