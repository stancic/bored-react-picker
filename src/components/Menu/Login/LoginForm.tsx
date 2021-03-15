import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import MenuData from "../MenuData/MenuData";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Reducers
import { logUser } from "../../../reducers/LoginReducer";

// Styles
import "./LoginForm.scss";

// Interfaces
import { ILoginCredentials } from "../../../services/UserServices";

const LoginForm: FunctionComponent = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((store: any) => store.loggedUser);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoginForm(false);
    }, 100);
    return () => {
      setShowLoginForm(true);
    };
  }, []);

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    const loginCredentials: ILoginCredentials = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    };
    dispatch(logUser(loginCredentials));
    if (loggedUser && loggedUser.status !== 401) {
      setUsernameOrEmail("");
      setPassword("");
    }
  };
  return (
    <div className="menu-container">
      <div
        className="login-form-container user-form-container"
        style={showLoginForm ? { opacity: 0 } : { opacity: 1 }}
      >
        <form method="POST" className="login-form user-form">
          <TextField
            required
            id="standard-basic"
            label="Username/Email"
            className="username-email input"
            value={usernameOrEmail}
            onChange={({ target }) => {
              setUsernameOrEmail(target.value);
            }}
          />
          <TextField
            required
            id="standard-basic"
            label="Password"
            type="password"
            className="password input"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
          <Button
            variant="contained"
            color="default"
            onClick={handleLogin}
            className="loggedUser-form-submit"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
      <MenuData />
    </div>
  );
};

export default LoginForm;
