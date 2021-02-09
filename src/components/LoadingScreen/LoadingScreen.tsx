import React, { FunctionComponent, useContext } from "react";
import { TitleStateContext } from "../Context/TitleStateContext";

// Styles
import "./LoadingScreen.scss";

const LoadingScreen: FunctionComponent = () => {
  const titleState = useContext(TitleStateContext);

  return (
    <h1 className="loading-title" style={titleState ? { opacity: 1 } : {}}>
      Bored?
    </h1>
  );
};

export default LoadingScreen;
