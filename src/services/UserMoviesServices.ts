import axios from "axios";
const baseurl = "http://localhost:3002/api";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

// Favorites
export class FavoriteMoviesServices {
  getFavoriteMovies = async (userid: string) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(
      baseurl + "/favorite-movies/" + userid,
      config
    );
    return response.data;
  };

  addToFavoriteMovies = async (movieToAdd: Object) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(
      baseurl + "/favorite-movies",
      movieToAdd,
      config
    );
    return response.data;
  };

  deleteFavoriteMovie = async (movieId: number) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(
      baseurl + "/favorite-movies/" + movieId,
      config
    );
    return response.data;
  };
}
// Watched
export class WatchedMoviesServices {
  getWatchedMovies = async (userid: string) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(
      baseurl + "/watched-movies/" + userid,
      config
    );
    return response.data;
  };

  addToWatchedMovies = async (movieToAdd: Object) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(
      baseurl + "/watched-movies",
      movieToAdd,
      config
    );
    return response.data;
  };

  deleteWatchedMovie = async (movieId: number) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(
      baseurl + "/watched-movies/" + movieId,
      config
    );
    return response.data;
  };
}
