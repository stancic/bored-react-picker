import React, { FunctionComponent, useEffect, useState } from "react";

// Styles
import "./LoadingScreen.scss";

const LoadingScreen: FunctionComponent = () => {
  const [titleRoll, setTitleRoll] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setTitleRoll(false);
    }, 1000);
    return () => {
      setTitleRoll(true);
    };
  }, []);

  return (
    <div>
      <div className="loading-title-container">
        <h1
          className="loading-title"
          style={titleRoll ? { opacity: "1" } : { opacity: "0" }}
        >
          Bored?
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
