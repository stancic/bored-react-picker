import { Dispatch } from "redux";
import {
  setToken,
  FavoriteMoviesServices,
} from "../services/UserMoviesServices";

const favoriteMoviesServices = new FavoriteMoviesServices();

const favoriteMoviesReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case "GET_ALL_FAVORITES":
      if (action.data === undefined) {
        return state;
      } else {
        return action.data;
      }
    case "ADD_TO_FAVORITES":
      return state.concat(action.data.addToFavorites);
    case "REMOVE_FAVORITE":
      return state.filter((item: any) => item !== state[action.index]);
    default:
      return state;
  }
};

export const getAllFavoriteMovies = (userToken: string, userId: string) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const favoriteMovies = await favoriteMoviesServices.getFavoriteMovies(
      userId
    );
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
    const deletedFavorite = await favoriteMoviesServices.deleteFavoriteMovie(
      movieId
    );
    dispatch({
      type: "REMOVE_FAVORITE",
      data: deletedFavorite,
      index: movieIndex,
    });
  };
};

export const addToFavorites = (user: any, movieId: number) => {
  return async (dispatch: Dispatch<any>) => {
    const movieToAdd = {
      movieId: movieId,
      userId: user.id,
    };
    setToken(user.token);
    const addToFavorites = await favoriteMoviesServices.addToFavoriteMoives(
      movieToAdd
    );
    dispatch({
      type: "ADD_TO_FAVORITES",
      data: { addToFavorites },
    });
  };
};
export default favoriteMoviesReducer;
