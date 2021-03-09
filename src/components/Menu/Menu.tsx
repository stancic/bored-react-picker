import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import { Turn as Hamburger } from "hamburger-react";
import MenuData from "./MenuData/MenuData";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";

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
        <LoginForm />
        <SignupForm />
        <MenuData />
      </div>
    </div>
  );
};

export default Menu;
