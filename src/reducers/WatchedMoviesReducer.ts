import { Dispatch } from "redux";
import {
  setToken,
  getWatchedMovies,
  deleteWatchedMovie,
} from "../services/UserMoviesServices";

const watchedMoviesReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case "GET_ALL_WATCHED":
      if (action.data === undefined) {
        return state;
      } else {
        return action.data;
      }
    case "REMOVE_WATCHED":
      console.log(action);
      return state.filter((item: any) => item !== state[action.index]);
    default:
      return state;
  }
};

export const getAllWatchedMovies = (userToken: string, userid: string) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const watchedMovies = await getWatchedMovies(userid);
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
    const deletedFavorite = await deleteWatchedMovie(movieId);
    dispatch({
      type: "REMOVE_WATCHED",
      data: deletedFavorite,
      index: movieIndex,
    });
  };
};
export default watchedMoviesReducer;
