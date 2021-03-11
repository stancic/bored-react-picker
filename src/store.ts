import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import loginReducer from "./reducers/LoginReducer";
import signupReducer from "./reducers/SignupReducer";

const reducer = combineReducers({
  loggedUser: loginReducer,
  signedUser: signupReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
