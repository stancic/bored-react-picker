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
