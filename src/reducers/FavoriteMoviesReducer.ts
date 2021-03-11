import { Dispatch } from "redux";
import {
  setToken,
  getFavoriteMovies,
  deleteFavoriteMovie,
} from "../services/UserMoviesServices";

const favoriteMoviesReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case "GET_ALL_FAVORITES":
      if (action.data === undefined) {
        return state;
      } else {
        return action.data;
      }
    case "REMOVE_FAVORITE":
      console.log(action);
      return state.filter((item: any) => item !== state[action.index]);
    default:
      return state;
  }
};

export const getAllFavoriteMovies = (userToken: string, userid: string) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const favoriteMovies = await getFavoriteMovies(userid);
    dispatch({
      type: "GET_ALL_FAVORITES",
      data: favoriteMovies,
    });
  };
};

export const removeMovieFromFavorites = (
  userToken: string,
  movieId: string,
  movieIndex: number
) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const deletedFavorite = await deleteFavoriteMovie(movieId);
    dispatch({
      type: "REMOVE_FAVORITE",
      data: deletedFavorite,
      index: movieIndex,
    });
  };
};
export default favoriteMoviesReducer;
