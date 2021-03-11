import axios from "axios";
const baseurl = "http://localhost:3002/api";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

export const getFavoriteMovies = async (userid: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(
    baseurl + "/favorite-movies/" + userid,
    config
  );
  return response.data;
};

export const deleteFavoriteMovie = async (movieid: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(
    baseurl + "/favorite-movies/" + movieid,
    config
  );
  return response.data;
};

export const getWatchedMovies = async (userid: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(
    baseurl + "/watched-movies/" + userid,
    config
  );
  return response.data;
};
