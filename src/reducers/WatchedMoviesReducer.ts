import { Dispatch } from "redux";

// Services
import {
  setToken,
  WatchedMoviesServices,
} from "../services/UserMoviesServices";
import { getMovieDetail } from "../services/MoviesServices";

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
      return state.concat(action.data);
    case "REMOVE_WATCHED":
      return state.filter((item: any) => item !== state[action.index]);
    default:
      return state;
  }
};

export const getAllWatchedMovies = (userToken: string, userid: string) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const watchedMoviesWithDetails: any = [];
    const watchedMovies = await watchedMoviesServices.getWatchedMovies(userid);
    watchedMovies.map(async (movie: any) => {
      watchedMoviesWithDetails.push(await getMovieDetail(movie.movieId));
    });
    dispatch({
      type: "GET_ALL_WATCHED",
      data: watchedMoviesWithDetails,
    });
  };
};

export const removeMovieFromWatched = (
  userToken: string,
  movieId: number,
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
    const watchedMovieDetails = await getMovieDetail(
      addToWatched.result.movieId
    );
    dispatch({
      type: "ADD_TO_WATCHED",
      data: watchedMovieDetails,
    });
  };
};
export default watchedMoviesReducer;
