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

// Interfaces
interface IReducer {
  loggedUser: IUser | IError;
  signedUser: IUser | IError;
  favoriteMovies: any;
  watchedMovies: any;
  ratedMovies: any;
}

const localStorage = new LocalStorage();

const persistedState = localStorage.loadState();

const reducer = combineReducers<IReducer>({
  loggedUser: loginReducer,
  signedUser: signupReducer,
  favoriteMovies: favoriteMoviesReducer,
  watchedMovies: watchedMoviesReducer,
  ratedMovies: ratedMoviesReducer,
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
