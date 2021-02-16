import axios from "axios";

const baseURL: string = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=`;
const detailBaseURL: string = "https://api.themoviedb.org/3/movie/";

export const getMovies = async (
  page: number | undefined,
  year: number | undefined,
  genre: number | undefined
) => {
  let url = baseURL + `${page}&year=${year}&with_genres=${genre}`;
  const request = axios.get(url);
  const response = await request;
  return response.data;
};

export const getMovieDetail = async (movieID: number | undefined) => {
  let url =
    detailBaseURL +
    `${movieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const request = axios.get(url);
  const response = await request;
  return response.data;
};

export const getTrailer = async (movieID: number | undefined) => {
  let url =
    detailBaseURL +
    `${movieID}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const request = axios.get(url);
  const response = await request;
  return response.data;
};
