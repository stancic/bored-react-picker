import { Dispatch } from "redux";
import { signup } from "../services/UserServices";

const signupReducer = (state = null, action: any) => {
  switch (action.type) {
    case "SIGNUP":
      if (action.data.signedUser.user === undefined) {
        return null;
      } else {
        return action.data.signedUser.user;
      }
    default:
      return state;
  }
};

export const userSignup = (data: Object) => {
  return async (dispatch: Dispatch<any>) => {
    const signedUser = await signup(data);
    dispatch({
      type: "SIGNUP",
      data: {
        signedUser,
      },
    });
  };
};

export default signupReducer;
