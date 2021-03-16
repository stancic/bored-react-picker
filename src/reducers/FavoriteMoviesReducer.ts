import { Dispatch } from "redux";

//Services
import {
  IAddToFavoritesMovie,
  IFavoriteMovie,
  setToken,
  FavoriteMoviesServices,
} from "../services/FavoriteMoviesServices";
import { getMovieDetail } from "../services/MoviesServices";

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
      if (action.status === 200) {
        alert("Added to favorites");
        return state.concat(action.data);
      } else {
        alert("Movie already on favorites list");
        return state;
      }
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
    favoriteMovies.map(async (movie: IFavoriteMovie) => {
      favoriteMoviesWithDetails.push(await getMovieDetail(movie.movieId));
    });
    dispatch({
      type: "GET_ALL_FAVORITES",
      data: favoriteMoviesWithDetails,
    });
  };
};

export const removeMovieFromFavorites = (
  userToken: string,
  movieId: number,
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

export const addToFavorites = (movieToAdd: IAddToFavoritesMovie) => {
  return async (dispatch: Dispatch<any>) => {
    const favoriteMovie = {
      movieId: movieToAdd.movieId,
      userId: movieToAdd.userId,
    };
    if (movieToAdd.userToken) {
      setToken(movieToAdd.userToken);
    }
    const addToFavorites = await favoriteMoviesServices.addToFavoriteMovies(
      favoriteMovie
    );
    if (addToFavorites.status === 200) {
      const favoriteMovieDetails = await getMovieDetail(
        addToFavorites.data.result.movieId
      );
      dispatch({
        type: "ADD_TO_FAVORITES",
        status: addToFavorites.status,
        data: favoriteMovieDetails,
      });
    } else {
      dispatch({
        type: "ADD_TO_FAVORITES",
        status: addToFavorites.status,
        data: addToFavorites,
      });
    }
  };
};
export default favoriteMoviesReducer;
