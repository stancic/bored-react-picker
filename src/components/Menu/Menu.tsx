import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Turn as Hamburger } from "hamburger-react";
import { BiLogOutCircle } from "react-icons/bi";
import MenuData from "./MenuData/MenuData";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import { Route, Link } from "react-router-dom";

// Reducers
import { logout } from "../../reducers/LoginReducer";

// Styles
import "./Menu.scss";

const Menu: FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user);
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

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
  };

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
        {user !== null && user !== 401 ? (
          <div className="menu-container">
            <div
              className="logout-button-container "
              onClick={handleLogout}
              style={
                menuIconState
                  ? { marginLeft: "0", zIndex: 7 }
                  : { marginLeft: "3000px", zIndex: 7 }
              }
            >
              <BiLogOutCircle />
              <span>logout</span>
            </div>
            <div className="menu-container">
              <MenuData />
            </div>
          </div>
        ) : (
          <div className="menu-container">
            <Route path="/login" component={LoginForm} />
            <Route path="/sign-up" component={SignupForm} />
            <Route path="/" exact component={MenuData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
