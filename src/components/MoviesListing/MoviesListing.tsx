import React, { FunctionComponent } from "react";

import "./MoviesListing.scss";

const MoviesListing: FunctionComponent<{ movies: any }> = ({ movies }) => {
  console.log(movies);
  return (
    <div className="movies-listing-container">
      {movies.map((movie: any) => (
        <span className="movie" key={movie.id}>
          {movie.original_title}
        </span>
      ))}
    </div>
  );
};

export default MoviesListing;
