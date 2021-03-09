import React, { useEffect, useState } from "react";

// Components
import ChooseCategory from "./components/ChooseCategory/ChooseCategory";
import MoviesListing from "./components/MoviesListing/MoviesListing";
import Menu from "./components/Menu/Menu";

// Services
import { getGuestToken } from "./services/moviesServices";

const App = () => {
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
  );
};

export default App;
