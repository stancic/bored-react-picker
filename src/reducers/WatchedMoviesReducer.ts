import { Dispatch } from "redux";

// Services
import {
  IAddToWatchedMovie,
  setToken,
  WatchedMoviesServices,
} from "../services/WatchedMoviesServices";
import { getMovieDetail } from "../services/MoviesServices";

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
      if (action.status === 200) {
        alert("Added to watched");
        return state.concat(action.data);
      } else {
        alert("Movie alredy on watched list");
        return state;
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

export const addToWatched = (movieToAdd: IAddToWatchedMovie) => {
  return async (dispatch: Dispatch<any>) => {
    const watchedMovie = {
      movieId: movieToAdd.movieId,
      userId: movieToAdd.userId,
    };
    if (movieToAdd.userToken) {
      setToken(movieToAdd.userToken);
    }
    const addToWatched = await watchedMoviesServices.addToWatchedMovies(
      watchedMovie
    );
    if (addToWatched.status === 200) {
      const watchedMovieDetails = await getMovieDetail(
        addToWatched.data.result.movieId
      );
      dispatch({
        type: "ADD_TO_WATCHED",
        status: addToWatched.status,
        data: watchedMovieDetails,
      });
    } else {
      dispatch({
        type: "ADD_TO_WATCHED",
        status: addToWatched.status,
        data: addToWatched,
      });
    }
  };
};
export default watchedMoviesReducer;
