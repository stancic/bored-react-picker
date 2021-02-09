import axios from "axios";

const baseURL: string = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

const getMovies = async () => {
  const request = axios.get(baseURL);
  const response = await request;
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getMovies };
