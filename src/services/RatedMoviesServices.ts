import axios from "axios";
const baseurl = "http://localhost:3002/api";

let token: string | null = null;

// Interfaces
export interface MovieToRate {
  rate: number;
  movieId: string;
  userId: string;
  userToken?: string;
}

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

export class RatedMoviesServices {
  rateMovie = async (movieToRate: MovieToRate) => {
    const config = {
      headers: { Authorization: token },
    };
    try {
      const response = await axios.post(
        baseurl + "/rated-movies",
        movieToRate,
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
        data: error.response.data.ratedMovie,
      };
      return er;
    }
  };
}
