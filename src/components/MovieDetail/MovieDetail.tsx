import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import { SiImdb, SiYoutube } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";

// Styles
import "./MovieDetail.scss";

// Services
import { getMovieDetail } from "../../services/moviesServices";
import { getTrailer } from "../../services/moviesServices";

interface Props {
  movie: any;
}

const MovieDetail: FunctionComponent<Props> = (movie) => {
  const movieDetail = movie.movie;
  const posterPath = "https://image.tmdb.org/t/p/w200";
  const imdbPath = "https://www.imdb.com/title/";
  const youTubePath = "https://www.youtube.com/embed/";
  const [imdbID, setImdbID] = useState(0);
  const [trailerID, setTrailerID] = useState<any>(undefined);
  const [openTrailerFlag, setOpenTrailerFlag] = useState<boolean>(true);

  useEffect(() => {
    const getIMDBID = async () => {
      const detail = await getMovieDetail(movieDetail.id);
      console.log(detail);
      setImdbID(detail.imdb_id);
    };
    const getMovieTrailer = async () => {
      const detail = await getTrailer(movieDetail.id);
      console.log(detail);
      setTrailerID(detail.results[0].key);
    };
    getMovieTrailer();
    getIMDBID();
  }, [movieDetail]);

  const openTrailer = () => {
    setOpenTrailerFlag((prev: boolean) => !prev);
  };

  console.log(openTrailerFlag);
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
        <h1 className="open-movie-title">{movieDetail.title}</h1>
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
                <SiYoutube className="movie-link" onClick={openTrailer} />
                <div
                  className="trailer-container"
                  style={
                    openTrailerFlag ? { display: "none" } : { display: "flex" }
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
  );
};

export default MovieDetail;
