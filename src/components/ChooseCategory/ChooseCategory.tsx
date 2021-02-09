import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

// Components
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { TitleStateContext } from "../Context/TitleStateContext";

// Styles
import "./ChooseCategory.scss";

// Services
import genresServices from "../../services/genresServices";
import moviesServices from "../../services/moviesServices";

type DataObject = {
  type: string;
  data: object;
};

const genreReducer = (state: DataObject, action: any) => {
  switch (action.type) {
    case "initialize":
      return action.data;
    default:
      return state;
  }
};

const moviesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "initialize":
      return action.data;
    default:
      return state;
  }
};

const ChooseCategory: FunctionComponent = () => {
  const [genresState, genresDispatch] = useReducer(genreReducer, []);
  const [moviesState, moviesDispatch] = useReducer(moviesReducer, []);

  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [genreID, setGenreID] = useState<number | undefined>(28);

  const genreIDRef = useRef(genreID);

  const [movies, setMovies] = useState<any>([]);
  const [titleState, setTitleState] = useState<boolean>(true);

  const initilaizeGenres = async () => {
    const genres = await genresServices.getGenres();
    genresDispatch({ type: "initialize", data: genres });
  };

  const initializeMovies = async (genreID?: number) => {
    const movies = await moviesServices.getMovies();
    moviesDispatch({ type: "initialize", data: movies.results });
  };

  const chooseGenre = (event: any) => {
    setSelectedGenre(event.target.value);
  };

  const showMovies = (genreID?: number) => {
    if (genres) {
      let selectedGenreID = genres.find(
        (genre) => genre.name === selectedGenre
      );
      setGenreID(selectedGenreID?.id);
    }
  };

  // Initialize genres and animate form and title
  useEffect(() => {
    initilaizeGenres();
    initializeMovies();
    setTimeout(() => {
      setTitleState(false);
    }, 1000);
    return () => {
      setTitleState(true);
    };
  }, []);

  // Set movies every time genre is changed
  useEffect(() => {
    if (genreIDRef) {
      setMovies(
        moviesState.filter((movie: any) => movie.genre_ids.includes(genreID))
      );
    }
  }, [moviesState, genreID]);

  // Set genres
  useEffect(() => {
    setGenres(genresState.genres);
  }, [genresState]);

  return (
    <div className="category-choice-container">
      <TitleStateContext.Provider value={titleState}>
        <LoadingScreen />
      </TitleStateContext.Provider>
      <div className="form-container" style={!titleState ? { opacity: 1 } : {}}>
        <form action="#">
          <select
            name="category"
            id="category"
            onChange={(e) => {
              chooseGenre(e);
            }}
          >
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
          <button type="button" onClick={() => showMovies(genreID)}>
            FIND MOVIES
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChooseCategory;
