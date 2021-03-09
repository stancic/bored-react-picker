import React, { FunctionComponent } from "react";

// Styles
import "./MenuData.scss";

const MenuData: FunctionComponent = () => {
  return (
    <div className="menu-data-container">
      <h1 className="menu-title">Bored?</h1>
      <p className="login-open">Login?</p>
      <p className="signup-open">Sign up?</p>
    </div>
  );
};

export default MenuData;
