import { Dispatch } from "redux";
import {
  setToken,
  WatchedMoviesServices,
} from "../services/UserMoviesServices";

const watchedMoviesServices = new WatchedMoviesServices();
const watchedMoviesReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case "GET_ALL_WATCHED":
      if (action.data === undefined) {
        return state;
      } else {
        return action.data;
      }
    case "REMOVE_WATCHED":
      return state.filter((item: any) => item !== state[action.index]);
    default:
      return state;
  }
};

export const getAllWatchedMovies = (userToken: string, userid: string) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const watchedMovies = await watchedMoviesServices.getWatchedMovies(userid);
    dispatch({
      type: "GET_ALL_WATCHED",
      data: watchedMovies,
    });
  };
};

export const removeMovieFromWatched = (
  userToken: string,
  movieId: string,
  movieIndex: number
) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const deletedFavorite = await watchedMoviesServices.deleteWatchedMovie(
      movieId
    );
    dispatch({
      type: "REMOVE_WATCHED",
      data: deletedFavorite,
      index: movieIndex,
    });
  };
};
export default watchedMoviesReducer;
