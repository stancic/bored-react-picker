import { Dispatch } from "redux";
import { setToken, getFavoriteMovies } from "../services/UserMoviesServices";

const favoriteMoviesReducer = (state = null, action: any) => {
  switch (action.type) {
    case "GET_ALL_FAVORITES":
      if (action.data === undefined) {
        return state;
      } else {
        return action.data;
      }
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

export default favoriteMoviesReducer;
