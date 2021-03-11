import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
// Components
import { Link } from "react-router-dom";

// Styles
import "./MenuData.scss";

const MenuData: FunctionComponent = () => {
  const loggedUser = useSelector((store: any) => store.loggedUser);
  return (
    <div className="menu-data-container">
      {loggedUser && loggedUser.status === 200 ? (
        <>
          <span className="open hover username">
            Hello {loggedUser.user.username}
          </span>
          <Link to="/" className="link">
            <h1 className="menu-title hover">Bored?</h1>
          </Link>
          <Link to="/favorite-movies" className="link">
            <span className="open hover">Favorite movies?</span>
          </Link>
          <Link to="/watched-movies" className="link">
            <span className="open hover">Watched movies?</span>
          </Link>
        </>
      ) : (
        <>
          <Link to="/" className="link">
            <h1 className="menu-title hover">Bored?</h1>
          </Link>
          <Link to="/login" className="link">
            <span className="login open hover">Login?</span>
          </Link>
          <Link to="/sign-up" className="link">
            <span className="signup open hover">Sign up?</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default MenuData;
