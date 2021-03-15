import { Dispatch } from "redux";
import {
  ILoginCredentials,
  IError,
  IUser,
  login,
} from "../services/UserServices";

// Interfaces
interface ILoginAction {
  type: string;
  data: any;
  loggedUser?: IError | IUser;
}

const loginReducer = (
  state: IError | IUser | null = null,
  action: ILoginAction
) => {
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

export const logUser = (credentials: ILoginCredentials) => {
  return async (dispatch: Dispatch<any>) => {
    const loggedUser: IError | IUser = await login(credentials);
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
