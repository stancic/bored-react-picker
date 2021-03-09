import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import { Turn as Hamburger } from "hamburger-react";
import MenuData from "./MenuData/MenuData";

// Context
import { LoginFormContext, SignupFormContext } from "../Context/Context";

// Styles
import "./Menu.scss";
import LoginForm from "./Login/LoginForm";

const Menu: FunctionComponent = () => {
  const [menuIconState, setMenuIconState] = useState<boolean>(false);
  const [showMenuIcon, setShowMenuIcon] = useState<boolean>(true);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMenuIcon(false);
    }, 1000);
    return () => {
      setShowMenuIcon(true);
    };
  }, []);

  const changeLoginFormState = (state: boolean) => {
    setShowLoginForm(state);
  };
  return (
    <div>
      <div
        className="open-close-icon-container"
        style={showMenuIcon ? { opacity: 0 } : { opacity: 1 }}
      >
        <Hamburger
          toggled={menuIconState}
          toggle={setMenuIconState}
          color={menuIconState ? "black" : "white"}
          size={40}
        />
      </div>
      <div
        className="menu-container"
        style={
          menuIconState
            ? { marginLeft: "0", zIndex: 7 }
            : { marginLeft: "3000px", zIndex: 7 }
        }
      >
        <LoginFormContext.Provider value={showLoginForm}>
          <LoginForm />
        </LoginFormContext.Provider>
        <MenuData changeLoginFormState={changeLoginFormState} />
      </div>
    </div>
  );
};

export default Menu;
