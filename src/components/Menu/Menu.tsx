import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import { Turn as Hamburger } from "hamburger-react";

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
        <div className="menu-data-container">
          <h1 className="menu-title">Bored?</h1>
          <p className="login-open">Login?</p>
          <p className="signup-open">Sign up?</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
