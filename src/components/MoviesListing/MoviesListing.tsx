import React, { FunctionComponent, useEffect, useRef, useState } from "react";

//Components
import InitializeMovieForm from "../InitializeMovieForm/InitializeMovieForm";
import MovieDetail from "../MovieDetail/MovieDetail";
import { AiOutlineClose } from "react-icons/ai";
import { Link, Route, useHistory } from "react-router-dom";

// Services
import { getMovies } from "../../services/MoviesServices";

// Styles
import "./MoviesListing.scss";

const MoviesListing: FunctionComponent<{
  movies: any;
  year: number | undefined;
  genreID: number | undefined;
  onMoviesUpdate: any;
  guestSessionID: string;
}> = ({ movies, year, genreID, onMoviesUpdate, guestSessionID }) => {
  const movieDetailContainerRef = useRef<any>(null);
  const history = useHistory();

  const [loadedMovies, setLoadedMovies] = useState<any>(movies);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [movieDetail, setMovieDetail] = useState<any>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [backdropURL, setBackdropURL] = useState<string>("");
  const [allBackdrops, setAllBackdrops] = useState<any>([]);
  const posterPath = "https://image.tmdb.org/t/p/w200";

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (Math.round(scrollHeight) - Math.round(scrollTop) === clientHeight) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setLoadedMovies(movies);
    movies.map((movie: any) =>
      setAllBackdrops((prev: any) => [
        ...prev,
        "https://image.tmdb.org/t/p/original/" + movie.backdrop_path,
      ])
    );
  }, [movies]);

  useEffect(() => {
    const loadMoreMovies = async () => {
      setLoading(true);
      const newMovies = await getMovies(pageNumber, year, genreID);
      setLoadedMovies((prev: any) => [...prev, ...newMovies.results]);
      newMovies.results.map((movie: any) =>
        setAllBackdrops((prev: any) => [
          ...prev,
          "https://image.tmdb.org/t/p/original/" + movie.backdrop_path,
        ])
      );
      setLoading(false);
    };

    loadMoreMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    const loadImage = (image_url: any) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image_url;
        loadImg.onload = () => resolve(image_url);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(
      allBackdrops.map((image: any) => loadImage(image))
    ).catch((err) => console.log("Failed to load images", err));
  }, [allBackdrops]);

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

  // Check if user clicked outside the movieDetail window
  useEffect(() => {
    /**
     * Close window if user clicked outside
     */
    const handleClickOutside = (event: any) => {
      if (
        movieDetailContainerRef.current &&
        !movieDetailContainerRef.current.contains(event.target)
      ) {
        setMovieDetail(false);
        history.push("/");
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [movieDetailContainerRef, history]);
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
            <Link to={`/movie/${movie.id}`}>
              <div className="movie-image-container">
                <img
                  className="movie-image"
                  src={posterPath + movie.poster_path}
                  alt="movie poster"
                  onMouseEnter={() =>
                    changeBackgroundAndMovieTitle(
                      movie.title,
                      movie.backdrop_path
                    )
                  }
                  onClick={() => openMovieDetails(movie)}
                />
              </div>
            </Link>
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
        <Link to="/">
          <AiOutlineClose
            className="close-button"
            onClick={() => setMovieDetail(false)}
          />
        </Link>
        {movieDetail ? (
          <Route path="/movie/:movieid">
            <div ref={movieDetailContainerRef}>
              <MovieDetail
                movie={movieDetail}
                guestSessionID={guestSessionID}
              />
            </div>
          </Route>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default MoviesListing;
