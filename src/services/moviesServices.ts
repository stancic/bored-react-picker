import axios from "axios";

const baseURL: string = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=`;
const detailBaseURL: string = "https://api.themoviedb.org/3/movie/";
const guestSessionURL: string = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`;

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

export const getGuestToken = async () => {
  const request = axios.get(guestSessionURL);
  const response = await request;
  return response.data;
};

export const rateMovie = async (
  movieID: number | undefined,
  rating: number | undefined,
  guestSessionID: string
) => {
  let url =
    detailBaseURL +
    `${movieID}/rating?api_key=${process.env.REACT_APP_API_KEY}&guest_session_id=${guestSessionID}`;
  const response = await axios.post(url, { value: rating });
  return response.data;
};
