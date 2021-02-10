import React, { useState } from "react";

// Components
import ChooseCategory from "./components/ChooseCategory/ChooseCategory";
import MoviesListing from "./components/MoviesListing/MoviesListing";

const App = () => {
  const [movies, setMovies] = useState<any>([]);

  const updateMovies = (movie: []) => {
    setMovies(movie);
  };
  return (
    <div className="App">
      <div className="loading-and-category-container">
        <ChooseCategory onMoviesUpdate={updateMovies} />
      </div>

      <div className="movies-container">
        <MoviesListing movies={movies} />
      </div>
    </div>
  );
};

export default App;
