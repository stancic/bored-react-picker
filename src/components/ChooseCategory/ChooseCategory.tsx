import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import InitializeMovieForm from "../InitializeMovieForm/InitializeMovieForm";

// Contexts
import { TitleStateContext } from "../Context/Context";

// Styles
import "./ChooseCategory.scss";

const ChooseCategory: FunctionComponent<{ onMoviesUpdate: any }> = ({
  onMoviesUpdate,
}: any) => {
  const [titleShowState, setTitleShowState] = useState<boolean>(true); // Loading title state

  useEffect(() => {
    setTimeout(() => {
      setTitleShowState(false);
    }, 1000);
    return () => {
      setTitleShowState(true);
    };
  }, []);

  return (
    <div className="category-choice-container">
      <TitleStateContext.Provider value={titleShowState}>
        <LoadingScreen />
        <InitializeMovieForm onMoviesUpdate={onMoviesUpdate} />
      </TitleStateContext.Provider>
    </div>
  );
};

export default ChooseCategory;
