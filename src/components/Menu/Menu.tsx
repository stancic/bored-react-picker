import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import { Turn as Hamburger } from "hamburger-react";
import MenuData from "./MenuData/MenuData";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import { Route, Link } from "react-router-dom";

// Styles
import "./Menu.scss";

const Menu: FunctionComponent = () => {
  const [menuIconState, setMenuIconState] = useState<boolean>(false);
  const [showMenuIcon, setShowMenuIcon] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowMenuIcon(false);
    }, 1000);
    return () => {
      setShowMenuIcon(true);
    };
  }, []);

  return (
    <div>
      <div
        className="open-close-icon-container"
        style={showMenuIcon ? { opacity: 0 } : { opacity: 1 }}
      >
        <Link to="/" className="link">
          <Hamburger
            toggled={menuIconState}
            toggle={setMenuIconState}
            color={menuIconState ? "black" : "white"}
            size={32}
          />
        </Link>
      </div>
      <div
        className="menu-container"
        style={
          menuIconState
            ? { marginLeft: "0", zIndex: 7 }
            : { marginLeft: "3000px", zIndex: 7 }
        }
      >
        <Route path="/login" component={LoginForm} />
        <Route path="/sign-up" component={SignupForm} />
        <Route path="/" exact component={MenuData} />
      </div>
    </div>
  );
};

export default Menu;
