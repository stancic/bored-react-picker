import axios from "axios";
const baseurl = "http://localhost:3002/api/users";

export const login = async (credentials: Object) => {
  const url = baseurl + "/login";
  const response = await axios.post(url, credentials);
  return response.data;
};
