import { Dispatch } from "redux";
import {
  setToken,
  RatedMoviesServices,
  IMovieToRate,
} from "../services/RatedMoviesServices";

const ratedMoviesServices = new RatedMoviesServices();

const ratedMoviesReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case "RATE_MOVIE":
      if (action.data.status === 500) {
        alert(`You've already rated ${action.title}`);
      } else {
        alert(`Thanks for rating ${action.title}`);
      }
      return action.data;
    default:
      return state;
  }
};

export const rateSelectedMovie = (
  movieToRate: IMovieToRate,
  movieTitle: string
) => {
  return async (dispatch: Dispatch<any>) => {
    const movie = {
      rate: movieToRate.rate,
      movieId: movieToRate.movieId,
      userId: movieToRate.userId,
    };
    if (movieToRate.userToken) {
      setToken(movieToRate.userToken);
    }
    const ratedMovie = await ratedMoviesServices.rateMovie(movie);
    dispatch({
      type: "RATE_MOVIE",
      data: ratedMovie,
      title: movieTitle,
    });
  };
};

export default ratedMoviesReducer;
