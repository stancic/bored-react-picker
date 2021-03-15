import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// Components
import MenuData from "../MenuData/MenuData";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Reducers
import { userSignup } from "../../../reducers/SignupReducer";

// Styles
import "./SignupForm.scss";

// Interfaces
import { ISignupCredentials } from "../../../services/UserServices";

const SignupForm: FunctionComponent = () => {
  const dispatch = useDispatch();
  let redirect = useHistory();
  const signedUser = useSelector((store: any) => store.signedUser);
  const [showSignupForm, setShowSignupForm] = useState<boolean>(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowSignupForm(false);
    }, 100);
    return () => {
      setShowSignupForm(true);
    };
  }, []);

  const handleSignup = (event: React.MouseEvent) => {
    event.preventDefault();
    const user: ISignupCredentials = {
      username: username,
      email: email,
      password: password,
    };
    dispatch(userSignup(user));
    if (
      signedUser &&
      (signedUser.status !== 409 || signedUser.status !== 400)
    ) {
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (signedUser && signedUser.status === 200) {
      alert(signedUser.message + "\nYou can login now.");
      redirect.push("/");
    } else if (
      signedUser &&
      (signedUser.status === 409 || signedUser.status === 400)
    ) {
      alert(signedUser.message);
    }
  }, [signedUser, redirect]);

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
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
            className="username input"
          />
          <TextField
            required
            id="standard-basic"
            label="Email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            className="username input"
          />
          <TextField
            required
            id="standard-basic"
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            className="password input"
          />
          <Button
            variant="contained"
            color="default"
            className="user-form-submit"
            type="submit"
            onClick={handleSignup}
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
