import { Dispatch } from "redux";

// Services
import {
  setToken,
  WatchedMoviesServices,
} from "../services/UserMoviesServices";

// Interfaces
interface AddToWatchedMovie {
  movieId: string;
  userId: string;
  userToken: string;
}
const watchedMoviesServices = new WatchedMoviesServices();

const watchedMoviesReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case "GET_ALL_WATCHED":
      if (action.data === undefined) {
        return state;
      } else {
        return action.data;
      }
    case "ADD_TO_WATCHED":
      return state.concat(action.data.addToWatched.result);
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

export const addToWatched = (movieToAdd: AddToWatchedMovie) => {
  return async (dispatch: Dispatch<any>) => {
    const watchedMovie = {
      movieId: movieToAdd.movieId,
      userId: movieToAdd.userId,
    };
    setToken(movieToAdd.userToken);
    const addToWatched = await watchedMoviesServices.addToWatchedMovies(
      watchedMovie
    );
    dispatch({
      type: "ADD_TO_WATCHED",
      data: { addToWatched },
    });
  };
};
export default watchedMoviesReducer;
