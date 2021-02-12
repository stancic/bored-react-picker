import React, { FunctionComponent, useEffect, useRef, useState } from "react";

// Services
import { getMovies } from "../../services/moviesServices";

// Styles
import "./MoviesListing.scss";

const MoviesListing: FunctionComponent<{
  movies: any;
  year: number | undefined;
  genreID: number | undefined;
}> = ({ movies, year, genreID }) => {
  let [loadedMovies, setLoadedMovies] = useState<any>(movies);
  let [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setLoadedMovies(movies);
  }, [movies]);

  useEffect(() => {
    const loadMoreMovies = async () => {
      setLoading(true);
      const newMovies = await getMovies(pageNumber, year, genreID);
      setLoadedMovies((prev: any) => [...prev, ...newMovies.results]);
      setLoading(false);
    };
    loadMoreMovies();
  }, [genreID, pageNumber, year]);

  return (
    <div className="movies-listing-container">
      <div className="movies-listing" onScroll={handleScroll}>
        {loadedMovies.map((movie: any) => (
          <span className="movie" key={loadedMovies.indexOf(movie)}>
            {movie.original_title}
          </span>
        ))}
        {loading ? <div>Loading...</div> : <div>End...</div>}
      </div>
    </div>
  );
};

export default MoviesListing;
