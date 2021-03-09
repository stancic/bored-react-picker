import React, { FunctionComponent } from "react";

// Components
import MenuData from "../MenuData/MenuData";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Styles
import "./SignupForm.scss";

const SignupForm: FunctionComponent = () => {
  return (
    <div className="menu-container">
      <div className="signup-form-container user-form-container">
        <form className="signup-form user-form">
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
          <Button variant="contained" color="default">
            Login
          </Button>
        </form>
      </div>
      <MenuData />
    </div>
  );
};

export default SignupForm;
