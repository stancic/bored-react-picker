import { Dispatch } from "redux";
import { getGenres } from "../services/GenresServices";

const genresReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case "INITIALIZE":
      if (action.data === undefined) {
        return state;
      } else {
        return action.data;
      }
    default:
      return state;
  }
};

export const getAllGenres = () => {
  return async (dispatch: Dispatch<any>) => {
    const allGenres = await getGenres();
    dispatch({
      type: "INITIALIZE",
      data: allGenres,
    });
  };
};

export default genresReducer;
