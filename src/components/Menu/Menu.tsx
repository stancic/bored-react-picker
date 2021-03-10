import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Turn as Hamburger } from "hamburger-react";
import { BiLogOutCircle } from "react-icons/bi";
import MenuData from "./MenuData/MenuData";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import { Route, Link, useHistory } from "react-router-dom";
import WatchedMovies from "./WatchedMovies/WatchedMovies";
import FavoriteMovies from "./FavoriteMovies/FavoriteMovies";

// Reducers
import { logout } from "../../reducers/LoginReducer";

// Styles
import "./Menu.scss";

const Menu: FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user);
  const signedUser = useSelector((store: any) => store.signedUser);
  let redirect = useHistory();
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
  useEffect(() => {
    if (user !== 401 && user !== null && user !== undefined) {
      redirect.push("/");
    } else if (user === 401) {
      alert("Wrong credentials");
    } else if (signedUser === 409 || signedUser === 409) {
      alert("Ooops try again");
    }
  }, [user, redirect, signedUser]);

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
              <Link to="/" className="link">
                <BiLogOutCircle />
                <span>logout</span>
              </Link>
            </div>
            <div className="menu-container">
              <Route path="/watched-movies" component={WatchedMovies} />
              <Route path="/favorite-movies" component={FavoriteMovies} />
              <Route path="/" exact component={MenuData} />
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
