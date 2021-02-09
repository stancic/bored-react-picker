import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from "react";

// Components
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { TitleStateContext } from "../Context/TitleStateContext";

// Styles
import "./ChooseCategory.scss";

// Services
import genresServices from "../../services/genresServices";

export type DataObject = {
  type: string;
  data: object;
};

const reducer = (state: DataObject, action: any) => {
  switch (action.type) {
    case "initialize":
      return action.data;
    default:
      return state;
  }
};

const ChooseCategory: FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const [titleState, setTitleState] = useState<boolean>(true);

  const initializeMovies = async () => {
    const genres = await genresServices.getGenres();
    dispatch({ type: "initialize", data: genres });
  };

  useEffect(() => {
    initializeMovies();
    setTimeout(() => {
      setTitleState(false);
    }, 1000);
    return () => {
      setTitleState(true);
    };
  }, []);

  useEffect(() => {
    setGenres(state.genres);
  }, [state]);
  return (
    <div className="category-choice-container">
      <TitleStateContext.Provider value={titleState}>
        <LoadingScreen />
      </TitleStateContext.Provider>
      <div className="form-container" style={!titleState ? { opacity: 1 } : {}}>
        <form action="#">
          <select name="category" id="category">
            {genres ? (
              genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>
          <input type="text" name="year" placeholder="Year" />
          <input type="submit" value="Find a movie!" />
        </form>
      </div>
    </div>
  );
};

export default ChooseCategory;
