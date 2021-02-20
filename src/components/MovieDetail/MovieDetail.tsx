import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import { SiImdb, SiYoutube } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import StarRatingComponent from "react-star-rating-component";

// Styles
import "./MovieDetail.scss";

// Services
import {
  getMovieDetail,
  getTrailer,
  rateMovie,
} from "../../services/moviesServices";

const MovieDetail: FunctionComponent<{
  movie: any;
  guestSessionID: string;
}> = ({ movie, guestSessionID }) => {
  const movieDetail = movie;
  const posterPath = "https://image.tmdb.org/t/p/w200";
  const imdbPath = "https://www.imdb.com/title/";
  const youTubePath = "https://www.youtube.com/embed/";
  const [imdbID, setImdbID] = useState(0);
  const [trailerID, setTrailerID] = useState<any>(undefined);
  const [openTrailerFlag, setOpenTrailerFlag] = useState<boolean>(true);
  const [movieRatingHelper, setMovieRatingHelper] = useState<number>(0);
  const [rateFlag, setRateFlag] = useState<boolean>(false);
  const [ratedMovieID, setRatedMovieID] = useState<any>(undefined);

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

  const changeRatingWhileHover = (newRating: number) => {
    setMovieRatingHelper(newRating);
  };
  const changeRating = () => {
    if (rateFlag && ratedMovieID === movieDetail.id) {
      alert("You've already rated this movie");
    } else {
      rateMovie(movieDetail.id, movieRatingHelper, guestSessionID);
      setRateFlag(true);
      setRatedMovieID(movieDetail.id);
      alert("Thanks for rating this movie");
    }
  };
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
        <div className="open-movie-title-container">
          <h1 className="open-movie-title">{movieDetail.title}</h1>
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
              <p>Rate this movie:</p>
              <StarRatingComponent
                name="movieRating"
                starCount={10}
                starColor="yellow"
                emptyStarColor="white"
                value={movieRatingHelper}
                onStarHover={changeRatingWhileHover}
                onStarClick={changeRating}
              />
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
