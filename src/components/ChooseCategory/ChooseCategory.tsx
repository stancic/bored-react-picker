import React, { FC, FunctionComponent, useEffect, useState } from "react";

// Components
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import InitializeMovieForm from "../InitializeMovieForm/InitializeMovieForm";

// Contexts
import { TitleStateContext } from "../Context/Context";

// Styles
import "./ChooseCategory.scss";

// --- Marko pisao ---
interface Props {
  onMoviesUpdate: (movies: Movies[]) => void;
}

interface Genres {
  id: string;
  name: string;
}

interface Movies {
  id: string;
  name: string;
  genres: Genres[];
}

// -- Marko pisao --

const ChooseCategory: FC<{ onMoviesUpdate: any }> = ({
  onMoviesUpdate,
}: any) => {
  const [titleShowState, setTitleShowState] = useState<boolean>(true); // Loading title state
  const [pageHideState, setPageHideState] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setTitleShowState(false);
    }, 1000);
    return () => {
      setTitleShowState(true);
    };
  }, []);

  const updatePageHideStatus = (state: boolean) => {
    setPageHideState(state);
  };

  return (
    <div
      className="category-choice-container"
      style={
        pageHideState ? { visibility: "hidden", height: 0, opacity: 0 } : {}
      }
    >
      <TitleStateContext.Provider value={titleShowState}>
        <LoadingScreen />
        <InitializeMovieForm
          onMoviesUpdate={onMoviesUpdate}
          onPageHideStatusUpdate={updatePageHideStatus}
        />
      </TitleStateContext.Provider>
    </div>
  );
};

export default ChooseCategory;
