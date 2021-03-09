import React, { FunctionComponent } from "react";

// Styles
import "./MenuData.scss";

const MenuData: FunctionComponent = () => {
  return (
    <div className="menu-data-container">
      <h1 className="menu-title">Bored?</h1>
      <span className="login-open">Login?</span>
      <span className="signup-open">Sign up?</span>
    </div>
  );
};

export default MenuData;
