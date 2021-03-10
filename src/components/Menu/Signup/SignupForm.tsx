import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import MenuData from "../MenuData/MenuData";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Styles
import "./SignupForm.scss";

const SignupForm: FunctionComponent = () => {
  const [showSignupForm, setShowSignupForm] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSignupForm(false);
    }, 100);
    return () => {
      setShowSignupForm(true);
    };
  }, []);
  return (
    <div className="menu-container">
      <div
        className="signup-form-container user-form-container"
        style={showSignupForm ? { opacity: 0 } : { opacity: 1 }}
      >
        <form method="POST" className="signup-form user-form">
          <TextField
            required
            id="standard-basic"
            label="Username"
            className="username input"
          />
          <TextField
            required
            id="standard-basic"
            label="Email"
            className="username input"
          />
          <TextField
            required
            id="standard-basic"
            label="Password"
            type="password"
            className="password input"
          />
          <Button
            variant="contained"
            color="default"
            className="user-form-submit"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </div>
      <MenuData />
    </div>
  );
};

export default SignupForm;
