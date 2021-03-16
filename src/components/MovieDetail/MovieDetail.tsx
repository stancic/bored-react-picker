import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { SiImdb, SiYoutube } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@material-ui/core/Button";
import StarsIcon from "@material-ui/icons/Stars";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Rating from "@material-ui/lab/Rating";

// Reducers
import { addToFavorites } from "../../reducers/FavoriteMoviesReducer";
import { addToWatched } from "../../reducers/WatchedMoviesReducer";
import { rateSelectedMovie } from "../../reducers/RatedMoviesReducer";

// Styles
import "./MovieDetail.scss";

// Services
import {
  getMovieDetail,
  getTrailer,
  rateMovie,
} from "../../services/MoviesServices";
import { IMovieToRate } from "../../services/RatedMoviesServices";

// Interfaces
interface Props {
  movie: any;
  guestSessionID: string;
}

const MovieDetail: FunctionComponent<Props> = ({ movie, guestSessionID }) => {
  const dispatch = useDispatch();

  //movie stuff
  const movieDetail = movie;
  const posterPath = "https://image.tmdb.org/t/p/w200";
  const imdbPath = "https://www.imdb.com/title/";
  const youTubePath = "https://www.youtube.com/embed/";
  const [imdbID, setImdbID] = useState(0);
  const [trailerID, setTrailerID] = useState<any>(undefined);
  const [openTrailerFlag, setOpenTrailerFlag] = useState<boolean>(true);
  const [movieRating, setMovieRating] = useState<number>(0.5);

  // user stuff
  const loggedUser = useSelector((store: any) => store.loggedUser);

  useEffect(() => {
    const getIMDBID = async () => {
      const detail = await getMovieDetail(movieDetail.id);
      setImdbID(detail.imdb_id);
    };
    const getMovieTrailer = async () => {
      const detail = await getTrailer(movieDetail.id);
      if (detail.results.length === 0) {
        setTrailerID(undefined);
      } else {
        setTrailerID(detail.results[0].key);
      }
    };
    getMovieTrailer();
    getIMDBID();
  }, [movieDetail]);

  const openTrailer = () => {
    setOpenTrailerFlag((prev: boolean) => !prev);
  };

  const handleAddToFavorites = () => {
    const movieToAdd = {
      movieId: movieDetail.id,
      userId: loggedUser.user.id,
      userToken: loggedUser.token,
    };
    dispatch(addToFavorites(movieToAdd));
  };

  const handleAddToWatched = () => {
    const movieToAdd = {
      movieId: movieDetail.id,
      userId: loggedUser.user.id,
      userToken: loggedUser.token,
    };
    dispatch(addToWatched(movieToAdd));
  };

  const handleRate = (movieRating: number) => {
    setMovieRating(movieRating);
    let movieToRate: IMovieToRate = {};
    if (loggedUser !== null) {
      movieToRate = {
        movieId: movieDetail.id,
        rate: movieRating,
        userId: loggedUser.user.id,
        userToken: loggedUser.token,
      };
      dispatch(rateSelectedMovie(movieToRate, movieDetail.title));
      rateMovie(movieDetail.id, movieToRate.rate, guestSessionID);
    }
  };

  console.log(movieDetail.title.length);
  return (
    <div>
      <AiOutlineClose
        className="close-button"
        onClick={openTrailer}
        style={
          openTrailerFlag
            ? { display: "none" }
            : { display: "flex", zIndex: 101 }
        }
      />
      <div className="open-movie-container">
        <div
          className="open-movie-title-container"
          style={
            movieDetail.title.length > 32 ? { flexDirection: "column" } : {}
          }
        >
          <h1 className="open-movie-title">{movieDetail.title}</h1>
          {loggedUser && loggedUser.status === 200 ? (
            <div className="logged-user-buttons-container">
              <Button
                aria-label="add to favorites"
                variant="contained"
                color="primary"
                startIcon={<StarsIcon />}
                className="add-to-favorites-button"
                onClick={handleAddToFavorites}
              >
                Add to favorites
              </Button>
              <Button
                aria-label="add to watched"
                variant="contained"
                color="default"
                startIcon={<VisibilityIcon />}
                className="add-to-watched-button"
                onClick={handleAddToWatched}
              >
                Add to watched
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="open-movie-data-container">
          <div className="open-movie-left-side-container">
            <div className="open-movie-image-and-detail-container">
              <img
                className="open-movie-image"
                src={posterPath + movieDetail.poster_path}
                alt="Movie"
              />
              <div className="open-movie-detail-container">
                <p className="release-year">
                  Release year: {movieDetail.release_date.substring(0, 4)}
                </p>
                <p className="vote-average">
                  Vote average: {movieDetail.vote_average}
                </p>
              </div>
            </div>
          </div>
          <div className="open-movie-right-side-container">
            <div className="open-movie-rating-container">
              {loggedUser && loggedUser.status === 200 ? (
                <>
                  <p>Rate this movie:</p>
                  <Rating
                    name="half-rating"
                    defaultValue={0}
                    precision={0.5}
                    size="large"
                    emptyIcon={
                      <StarBorderIcon
                        style={{ color: "white", fontSize: 30 }}
                      />
                    }
                    value={movieRating / 2}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        handleRate(newValue * 2);
                      }
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="open-movie-overview-and-imdbyt-container">
              <div className="open-movie-overview-container">
                <p className="movie-overview">{movieDetail.overview}</p>
              </div>
              <hr />
              <div className="open-movie-imdbyt-container">
                <div className="imdb-container">
                  <a
                    href={imdbPath + imdbID}
                    target="_blank"
                    rel="noreferrer"
                    className="movie-link"
                  >
                    <SiImdb />
                  </a>
                </div>
                <div className="yt-container">
                  <SiYoutube
                    className="movie-link"
                    onClick={openTrailer}
                    style={
                      trailerID === undefined
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  />
                  <div
                    className="trailer-container"
                    style={
                      openTrailerFlag
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                  >
                    <iframe
                      title={youTubePath + trailerID}
                      src={youTubePath + trailerID}
                      width="auto"
                      height="auto"
                      className="embeded-video"
                      frameBorder="0"
                      style={
                        openTrailerFlag
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
