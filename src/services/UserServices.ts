import axios from "axios";
const baseurl = "http://localhost:3002/api/users";

export const login = async (credentials: Object) => {
  const url = baseurl + "/login";
  try {
    const response = await axios.post(url, credentials);
    return response.data;
  } catch (error) {
    return error.response.status;
  }
};

export const signup = async (data: Object) => {
  const url = baseurl + "/sign-up";
  try {
    const response = await axios.post(url, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
};
