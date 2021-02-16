import React, { FunctionComponent, useEffect, useState } from "react";

//Components
import InitializeMovieForm from "../InitializeMovieForm/InitializeMovieForm";

// Services
import { getMovies } from "../../services/moviesServices";

// Styles
import "./MoviesListing.scss";

const MoviesListing: FunctionComponent<{
  movies: any;
  year: number | undefined;
  genreID: number | undefined;
  onMoviesUpdate: any;
}> = ({ movies, year, genreID, onMoviesUpdate }) => {
  let [loadedMovies, setLoadedMovies] = useState<any>(movies);
  let [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const posterPath = "https://image.tmdb.org/t/p/w200";

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setLoadedMovies(movies);
  }, [movies]);

  useEffect(() => {
    const loadMoreMovies = async () => {
      setLoading(true);
      const newMovies = await getMovies(pageNumber, year, genreID);
      setLoadedMovies((prev: any) => [...prev, ...newMovies.results]);
      setLoading(false);
    };
    loadMoreMovies();
  }, [genreID, pageNumber, year]);

  console.log(loadedMovies);

  return (
    <div className="movies-listing-container">
      <div className="movies-listing" onScroll={handleScroll}>
        {loadedMovies.map((movie: any) => (
          <div className="movie" key={loadedMovies.indexOf(movie)}>
            <div className="movie-image-container">
              <img
                className="movie-image"
                src={posterPath + movie.poster_path}
                alt="movie poster"
              />
            </div>
            <div className="movie-title-container">
              <span className="movie-title">{movie.title}</span>
            </div>
          </div>
        ))}
        {loading ? <div>Loading...</div> : <div>End...</div>}
      </div>
      <div className="new-movies-form-container">
        <InitializeMovieForm
          onMoviesUpdate={onMoviesUpdate}
          onPageHideStatusUpdate={() => false}
        />
      </div>
    </div>
  );
};

export default MoviesListing;
