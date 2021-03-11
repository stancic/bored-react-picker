import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Turn as Hamburger } from "hamburger-react";
import { BiLogOutCircle } from "react-icons/bi";
import MenuData from "./MenuData/MenuData";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import { Route, Link, useHistory } from "react-router-dom";
import UserMovies from "./UserMovies/UserMovies";

// Reducers
import { logout } from "../../reducers/LoginReducer";
import { getAllFavoriteMovies } from "../../reducers/FavoriteMoviesReducer";
import { getAllWatchedMovies } from "../../reducers/WatchedMoviesReducer";

// Styles
import "./Menu.scss";

const Menu: FunctionComponent = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((store: any) => store.loggedUser);
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
    if (loggedUser && loggedUser.status === 200) {
      alert(loggedUser.message);
      console.log(loggedUser);
      dispatch(getAllFavoriteMovies(loggedUser.token, loggedUser.user.id));
      dispatch(getAllWatchedMovies(loggedUser.token, loggedUser.user.id));
      redirect.push("/");
    } else if (
      loggedUser &&
      (loggedUser.status === 401 || loggedUser.status === 400)
    ) {
      alert(loggedUser.message);
    }
  }, [dispatch, loggedUser, redirect]);
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
        {loggedUser && loggedUser.status === 200 ? (
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
              <Route path="/watched-movies">
                <UserMovies whichMovies="watched" />
              </Route>
              <Route path="/favorite-movies">
                <UserMovies whichMovies="favorite" />
              </Route>
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
