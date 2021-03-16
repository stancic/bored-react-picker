import axios from "axios";

// Interfaces
export interface IAddToWatchedMovie {
  movieId: string;
  userId: string;
  userToken?: string;
}

const baseurl = "http://localhost:3002/api";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

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

  addToWatchedMovies = async (movieToAdd: IAddToWatchedMovie) => {
    const config = {
      headers: { Authorization: token },
    };
    try {
      const response = await axios.post(
        baseurl + "/watched-movies",
        movieToAdd,
        config
      );
      const res = {
        status: response.status,
        data: response.data,
      };
      return res;
    } catch (error) {
      const er = {
        status: error.response.status,
        data: error.response.data,
      };
      return er;
    }
  };

  deleteWatchedMovie = async (movieId: number) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(
      baseurl + "/watched-movies/" + movieId,
      config
    );
    const res = {
      status: response.status,
      data: response.data,
    };
    return res;
  };
}
