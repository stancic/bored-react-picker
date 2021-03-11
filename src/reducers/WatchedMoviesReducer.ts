import { Dispatch } from "redux";
import { setToken, getWatchedMovies } from "../services/UserMoviesServices";

const watchedMoviesReducer = (state = null, action: any) => {
  switch (action.type) {
    case "GET_ALL_WATCHED":
      if (action.data === undefined) {
        return state;
      } else {
        return action.data;
      }
    default:
      return state;
  }
};

export const getAllWatchedMovies = (userToken: string) => {
  return async (dispatch: Dispatch<any>) => {
    setToken(userToken);
    const watchedMovies = await getWatchedMovies();
    dispatch({
      type: "GET_ALL_WATCHED",
      data: watchedMovies,
    });
  };
};

export default watchedMoviesReducer;
