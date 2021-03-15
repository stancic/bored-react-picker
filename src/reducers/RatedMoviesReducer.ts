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
      return action.data;
    default:
      return state;
  }
};

export const rateSelectedMovie = (movieToRate: IMovieToRate) => {
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
    });
  };
};

export default ratedMoviesReducer;
