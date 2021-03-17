import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { LocalStorage } from "./localStorage";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import favoriteMoviesReducer from "./reducers/FavoriteMoviesReducer";
import loginReducer from "./reducers/LoginReducer";
import ratedMoviesReducer from "./reducers/RatedMoviesReducer";
import signupReducer from "./reducers/SignupReducer";
import watchedMoviesReducer from "./reducers/WatchedMoviesReducer";
import { IError, IUser } from "./services/UserServices";
import genresReducer from "./reducers/GenresReducer";

// Interfaces
interface IReducer {
  loggedUser: IUser | IError;
  signedUser: IUser | IError;
  favoriteMovies: any;
  watchedMovies: any;
  ratedMovies: any;
  genres: any;
}

const localStorage = new LocalStorage();

const persistedState = localStorage.loadState();

const reducer = combineReducers<IReducer>({
  loggedUser: loginReducer,
  signedUser: signupReducer,
  favoriteMovies: favoriteMoviesReducer,
  watchedMovies: watchedMoviesReducer,
  ratedMovies: ratedMoviesReducer,
  genres: genresReducer,
});

const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    localStorage.saveState({
      loggedUser: store.getState().loggedUser,
    });
  }, 1000)
);

export default store;
