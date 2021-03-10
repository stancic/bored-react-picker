import { Dispatch } from "redux";
import { login } from "../services/LoginServices";

const loginReducer = (state = null, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return action.data.user.user;
    case "LOGOUT":
      return action.data;
    default:
      return state;
  }
};

export const logUser = (credentials: Object) => {
  return async (dispatch: Dispatch<any>) => {
    const user = await login(credentials);
    dispatch({
      type: "LOGIN",
      data: { user },
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
