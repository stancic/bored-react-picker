import React, { FunctionComponent, useEffect, useState } from "react";

//Components
import InitializeMovieForm from "../InitializeMovieForm/InitializeMovieForm";
import MovieDetail from "../MovieDetail/MovieDetail";
import { AiOutlineClose } from "react-icons/ai";

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
  const [loadedMovies, setLoadedMovies] = useState<any>(movies);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [movieDetail, setMovieDetail] = useState<any>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [backdropURL, setBackdropURL] = useState<string>("");
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

  const changeBackgroundAndMovieTitle = (
    movieTitle: string,
    backdrop: string
  ) => {
    setBackdropURL(backdrop);
    setMovieTitle(movieTitle);
  };

  const openMovieDetails = (movie: any) => {
    setMovieDetail(movie);
  };
  return (
    <div
      className="movies-listing-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdropURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="movies-listing-title">
        {movieTitle ? movieTitle : "Pick a movie."}
      </h1>
      <div className="movies-listing" onScroll={handleScroll}>
        {loadedMovies.map((movie: any) => (
          <div className="movie" key={loadedMovies.indexOf(movie)}>
            <div className="movie-image-container">
              <img
                className="movie-image"
                src={posterPath + movie.poster_path}
                alt="movie poster"
                onMouseOver={() =>
                  changeBackgroundAndMovieTitle(
                    movie.title,
                    movie.backdrop_path
                  )
                }
                onClick={() => openMovieDetails(movie)}
              />
            </div>
            <div className="movie-title-container">
              <span className="movie-title">{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="new-movies-form-container">
        <InitializeMovieForm
          onMoviesUpdate={onMoviesUpdate}
          onPageHideStatusUpdate={() => false}
        />
      </div>
      <div
        className="movie-detail-container"
        style={
          movieDetail
            ? { visibility: "visible", opacity: 1 }
            : { visibility: "hidden", opacity: 0 }
        }
      >
        <AiOutlineClose
          onClick={() => setMovieDetail(false)}
          className="close-button"
        />
        {movieDetail ? <MovieDetail movie={movieDetail} /> : <div />}
      </div>
    </div>
  );
};

export default MoviesListing;
