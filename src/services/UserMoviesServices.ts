import axios from "axios";
const baseurl = "http://localhost:3002/api";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

export const getFavoriteMovies = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseurl + "/favorite-movies", config);
  return response.data;
};

export const getWatchedMovies = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseurl + "/watched-movies", config);
  return response.data;
};
