import axios from "axios";

const baseURL: string = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

export const getGenres = async () => {
  const request = axios.get(baseURL);
  const response = await request;
  return response.data;
};
