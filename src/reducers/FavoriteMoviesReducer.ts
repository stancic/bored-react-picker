import { Dispatch } from "redux";

//Services
import {
  setToken,
  FavoriteMoviesServices,
} from "../services/UserMoviesServices";
import { getMovieDetail } from "../services/MoviesServices";

// Interfaces
interface AddToFavoritesMovie {
  movieId: string;
  userId: string;
  userToken: string;
}
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
      return state.concat(action.data);
    case "REMOVE_FAVORITE":
      return state.filter((item: any) => item !== state[action.index]);
    default:
      return state;
  }
};

export const getAllFavoriteMovies = (userToken: string, userId: string) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const favoriteMoviesWithDetails: any = [];
    const favoriteMovies = await favoriteMoviesServices.getFavoriteMovies(
      userId
    );
    favoriteMovies.map(async (movie: any) => {
      favoriteMoviesWithDetails.push(await getMovieDetail(movie.movieId));
    });
    await dispatch({
      type: "GET_ALL_FAVORITES",
      data: favoriteMoviesWithDetails,
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

export const addToFavorites = (movieToAdd: AddToFavoritesMovie) => {
  return async (dispatch: Dispatch<any>) => {
    const favoriteMovie = {
      movieId: movieToAdd.movieId,
      userId: movieToAdd.userId,
    };
    setToken(movieToAdd.userToken);
    const addToFavorites = await favoriteMoviesServices.addToFavoriteMovies(
      favoriteMovie
    );
    const favoriteMovieDetails = await getMovieDetail(
      addToFavorites.result.movieId
    );
    dispatch({
      type: "ADD_TO_FAVORITES",
      data: favoriteMovieDetails,
    });
  };
};
export default favoriteMoviesReducer;
