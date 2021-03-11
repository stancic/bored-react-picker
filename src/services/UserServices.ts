import axios from "axios";
const baseurl = "http://localhost:3002/api/users";

export const login = async (credentials: Object) => {
  const url = baseurl + "/login";
  try {
    const response = await axios.post(url, credentials);
    const res = {
      status: response.status,
      user: response.data.user,
      message: response.data.message,
      token: response.data.token,
    };
    return res;
  } catch (error) {
    const er = {
      status: error.response.status,
      message: error.response.data.error,
    };
    return er;
  }
};

export const signup = async (data: Object) => {
  const url = baseurl + "/sign-up";
  try {
    const response = await axios.post(url, data);
    const res = {
      status: response.status,
      user: response.data.user,
      message: response.data.message,
    };
    return res;
  } catch (error) {
    const er = {
      status: error.response.status,
      message: error.response.data.message,
    };
    return er;
  }
};
