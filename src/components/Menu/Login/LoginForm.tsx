import React, { FunctionComponent, useContext, useEffect } from "react";

// Context
import { LoginFormContext } from "../../Context/Context";

// Styles
import "./LoginForm.scss";

const LoginForm: FunctionComponent = () => {
  const loginFormState = useContext(LoginFormContext);
  return (
    <div>
      <div style={loginFormState ? { display: "block" } : { display: "none" }}>
        hello login
      </div>
    </div>
  );
};

export default LoginForm;
