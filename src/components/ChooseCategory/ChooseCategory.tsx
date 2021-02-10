import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from "react";

// Components
import LoadingScreen from "../LoadingScreen/LoadingScreen";

// Contexts
import { TitleStateContext } from "../Context/Context";

// Styles
import "./ChooseCategory.scss";

// Services
import { getGenres } from "../../services/genresServices";
import { getMovies } from "../../services/moviesServices";

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

const ChooseCategory: FunctionComponent<{ onMoviesUpdate: any }> = ({
  onMoviesUpdate,
}: any) => {
  // Reducer states
  const [genresState, genresDispatch] = useReducer(genreReducer, []);
  const [moviesState, moviesDispatch] = useReducer(moviesReducer, []);

  // Used states
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("Action"); // Genre on button click
  const [genreID, setGenreID] = useState<number | undefined>(28); // Genre id from selected genre

  const [movies, setMovies] = useState<any>([]); // Movies state shared between components
  const [titleShowState, setTitleShowState] = useState<boolean>(true); // Loading title state

  const [year, setYear] = useState<number>(1895);
  const [yearHelper, setYearHelper] = useState<number>(1895);

  const [pageHideState, setPageHideState] = useState<boolean>(false);

  const initilaizeGenres = async () => {
    const genres = await getGenres();
    genresDispatch({ type: "initialize", data: genres });
  };

  const initializeMovies = async (
    genre: number | undefined,
    year: number | undefined
  ) => {
    if (year && year < 1895 && year > 2021) {
      alert("WRONG YEAR INPUT");
    } else {
      const movies = await getMovies(genre, year);
      moviesDispatch({ type: "initialize", data: movies.results });
    }
  };

  const chooseGenre = (event: any) => {
    setSelectedGenre(event.target.value);
  };

  const showMovies = () => {
    if (genres) {
      let selectedGenreID = genres.find(
        (genre) => genre.name === selectedGenre
      );
      setGenreID(selectedGenreID?.id);
    }
    if (yearHelper < 1895 || yearHelper > 2021) {
      alert("Year should be later than 1894 and sooner than 2022!");
    } else {
      setYear(yearHelper);
    }
    //setPageHideState(true);
  };

  // Initialize genres and animate form and title
  useEffect(() => {
    initilaizeGenres();
    setTimeout(() => {
      setTitleShowState(false);
    }, 1000);
    return () => {
      setTitleShowState(true);
    };
  }, []);

  // Set movies every time genre is changed
  useEffect(() => {
    setMovies(moviesState);
  }, [moviesState]);

  // Set genres
  useEffect(() => {
    setGenres(genresState.genres);
  }, [genresState]);

  // Every time genreID changes, movies will change
  useEffect(() => {
    initializeMovies(genreID, year);
  }, [genreID, year]);

  // Share movies to MoviesListing component
  useEffect(() => {
    onMoviesUpdate(movies);
  }, [onMoviesUpdate, movies]);

  return (
    <div
      className="category-choice-container"
      style={
        pageHideState ? { visibility: "hidden", opacity: 0, height: 0 } : {}
      }
    >
      <TitleStateContext.Provider value={titleShowState}>
        <LoadingScreen />
      </TitleStateContext.Provider>
      <div
        className="form-container"
        style={!titleShowState ? { opacity: 1 } : {}}
      >
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
          <input
            type="number"
            name="year"
            placeholder="Year"
            onChange={({ target }) => {
              setYearHelper(Number(target.value));
            }}
          />
          <button type="button" onClick={() => showMovies()}>
            FIND MOVIES
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChooseCategory;
