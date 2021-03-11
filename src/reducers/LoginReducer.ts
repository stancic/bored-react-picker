import { Dispatch } from "redux";
import { login } from "../services/UserServices";

const loginReducer = (state = null, action: any) => {
  switch (action.type) {
    case "LOGIN":
      if (action.data.loggedUser === undefined) {
        return state;
      } else {
        return action.data.loggedUser;
      }
    case "LOGOUT":
      return action.data;
    default:
      return state;
  }
};

export const logUser = (credentials: Object) => {
  return async (dispatch: Dispatch<any>) => {
    const loggedUser = await login(credentials);
    dispatch({
      type: "LOGIN",
      data: { loggedUser },
    });
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: "LOGOUT",
      data: null,
    });
  };
};

export default loginReducer;
