import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import favoriteMoviesReducer from "./reducers/FavoriteMoviesReducer";
import loginReducer from "./reducers/LoginReducer";
import signupReducer from "./reducers/SignupReducer";
import watchedMoviesReducer from "./reducers/WatchedMoviesReducer";

const reducer = combineReducers({
  loggedUser: loginReducer,
  signedUser: signupReducer,
  favoriteMovies: favoriteMoviesReducer,
  watchedMovies: watchedMoviesReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
