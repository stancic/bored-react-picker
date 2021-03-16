import axios from "axios";
const baseurl = "http://localhost:3002/api";

// Interfaces
export interface IFavoriteMovie {
  createdAt: Date;
  id: string;
  movieId: number;
  updatedAt: Date;
  userId: string;
}

export interface IAddToFavoritesMovie {
  movieId: string;
  userId: string;
  userToken?: string;
}

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

export class FavoriteMoviesServices {
  getFavoriteMovies = async (userid: string) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(
      baseurl + "/favorite-movies/" + userid,
      config
    );
    const res: [IFavoriteMovie] = response.data;
    return res;
  };

  addToFavoriteMovies = async (movieToAdd: IAddToFavoritesMovie) => {
    const config = {
      headers: { Authorization: token },
    };
    try {
      const response = await axios.post(
        baseurl + "/favorite-movies",
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
