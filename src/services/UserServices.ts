import axios from "axios";
const baseurl = "http://localhost:3002/api/users";

// Interfaces
export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface ILoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface ISignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface IResponse {
  status: number;
  user: IUser;
  message: string;
  token?: string;
}

export interface IError {
  status: number;
  message: string;
}

export const login = async (credentials: ILoginCredentials) => {
  const url = baseurl + "/login";
  try {
    const response = await axios.post(url, credentials);
    const res: IResponse = {
      status: response.status,
      user: response.data.user,
      message: response.data.message,
      token: response.data.token,
    };
    return res;
  } catch (error) {
    const er: IError = {
      status: error.response.status,
      message: error.response.data.error,
    };
    return er;
  }
};

export const signup = async (data: ISignupCredentials) => {
  const url = baseurl + "/sign-up";
  try {
    const response = await axios.post(url, data);
    const res: IResponse = {
      status: response.status,
      user: response.data.user,
      message: response.data.message,
    };
    return res;
  } catch (error) {
    const er: IError = {
      status: error.response.status,
      message: error.response.data.message,
    };
    return er;
  }
};
