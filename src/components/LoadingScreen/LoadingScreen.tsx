import React, { useState } from "react";

// Styles
import "./LoadingScreen.scss";

const LoadingScreen: React.FC = () => {
  const [titleRoll, setTitleRoll] = useState<boolean>(false);
  setTimeout(() => {
    setTitleRoll(true);
  }, 1000);
  return (
    <div>
      <div className="loading-title-container">
        <h1
          className="loading-title"
          style={titleRoll ? { marginRight: 0 } : {}}
        >
          Bored?
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
