import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import MenuData from "../MenuData/MenuData";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Styles
import "./LoginForm.scss";

const LoginForm: FunctionComponent = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoginForm(false);
    }, 100);
    return () => {
      setShowLoginForm(true);
    };
  }, []);

  return (
    <div className="menu-container">
      <div
        className="login-form-container user-form-container"
        style={showLoginForm ? { opacity: 0 } : { opacity: 1 }}
      >
        <form className="login-form user-form">
          <TextField
            required
            id="standard-basic"
            label="Username/Email"
            className="username-email input"
          />
          <TextField
            required
            id="standard-basic"
            label="Password"
            type="password"
            className="password input"
          />
          <Button variant="contained" color="default">
            Login
          </Button>
        </form>
      </div>
      <MenuData />
    </div>
  );
};

export default LoginForm;
