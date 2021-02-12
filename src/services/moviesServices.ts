import axios from "axios";

const baseURL: string = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=`;

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
