import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// Services
import { getGenres } from "../../services/genresServices";
import { getMovies } from "../../services/moviesServices";
import { TitleStateContext } from "../Context/Context";

// Styles
import "./InitializeMovieForm.scss";

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

const InitializeMovieForm: FunctionComponent<{ onMoviesUpdate: any }> = ({
  onMoviesUpdate,
}: any) => {
  const titleShowState = useContext(TitleStateContext); // Loading title state

  // Reducer states
  const [genresState, genresDispatch] = useReducer(genreReducer, []);
  const [moviesState, moviesDispatch] = useReducer(moviesReducer, []);

  // Used states
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("Action"); // Genre on button click
  const [genreID, setGenreID] = useState<number | undefined>(28); // Genre id from selected genre

  const [movies, setMovies] = useState<any>([]); // Movies state shared between components

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
      const movies = await getMovies(1, year, genre);
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
    onMoviesUpdate(movies, year, genreID);
  }, [onMoviesUpdate, movies, year, genreID]);
  return (
    <>
      <div
        className="form-container"
        style={!titleShowState ? { opacity: 1 } : {}}
      >
        <h1>Let me recommend you something</h1>
        <form action="#">
          <select
            size={1}
            name="category"
            id="category"
            className="choice category-select"
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
            className="choice year-input"
            onChange={({ target }) => {
              setYearHelper(Number(target.value));
            }}
          />
          <button
            type="button"
            onClick={() => showMovies()}
            className="find-button"
          >
            FIND MOVIES
          </button>
        </form>
      </div>
    </>
  );
};

export default InitializeMovieForm;
