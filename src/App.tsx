import React, { useState } from "react";

// Components
import ChooseCategory from "./components/ChooseCategory/ChooseCategory";
import MoviesListing from "./components/MoviesListing/MoviesListing";

const App = () => {
  const [movies, setMovies] = useState<any>([]);
  const [year, setYear] = useState<number | undefined>(0);
  const [genreID, setGenreID] = useState<number | undefined>(28);

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
      <div className="loading-and-category-container">
        <ChooseCategory onMoviesUpdate={updateMovies} />
      </div>

      <div className="movies-container">
        <MoviesListing movies={movies} year={year} genreID={genreID} />
      </div>
    </div>
  );
};

export default App;
