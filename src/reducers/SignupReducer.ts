import { Dispatch } from "redux";
import {
  IError,
  ISignupCredentials,
  IUser,
  signup,
} from "../services/UserServices";

// Interfaces
interface ISignupAction {
  type: string;
  data: any;
  signedUser?: IError | IUser;
}

const signupReducer = (
  state: IError | IUser | null = null,
  action: ISignupAction
) => {
  switch (action.type) {
    case "SIGNUP":
      if (action.data.signedUser === undefined) {
        return state;
      } else {
        return action.data.signedUser;
      }
    default:
      return state;
  }
};

export const userSignup = (data: ISignupCredentials) => {
  return async (dispatch: Dispatch<any>) => {
    const signedUser: IError | IUser = await signup(data);
    dispatch({
      type: "SIGNUP",
      data: {
        signedUser,
      },
    });
  };
};

export default signupReducer;
