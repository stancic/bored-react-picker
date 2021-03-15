import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import ChooseCategory from "./components/ChooseCategory/ChooseCategory";
import MoviesListing from "./components/MoviesListing/MoviesListing";
import Menu from "./components/Menu/Menu";
import { BrowserRouter as Router } from "react-router-dom";

// Services
import { getGuestToken } from "./services/MoviesServices";

const App: FunctionComponent = () => {
  const [movies, setMovies] = useState<any>([]);
  const [year, setYear] = useState<number | undefined>(0);
  const [genreID, setGenreID] = useState<number | undefined>(0);
  const [guestSessionID, setGuestSessionID] = useState<string>("");

  const getGuestSessionID = async () => {
    const sessionID = await getGuestToken();
    setGuestSessionID(sessionID.guest_session_id);
  };

  useEffect(() => {
    getGuestSessionID();
  }, []);

  const updateMovies = (
    movie: [],
    year: number | undefined,
    genreID: number | undefined
  ) => {
    setMovies(movie);
    setYear(year);
    setGenreID(genreID);
  };
  return (
    <Router>
      <div className="App">
        <Menu />
        <div className="loading-and-category-container">
          <ChooseCategory onMoviesUpdate={updateMovies} />
        </div>

        <div className="movies-container">
          <MoviesListing
            movies={movies}
            year={year}
            genreID={genreID}
            onMoviesUpdate={updateMovies}
            guestSessionID={guestSessionID}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
