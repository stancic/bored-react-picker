import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

// Components
import MenuData from "../MenuData/MenuData";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

// Reducers
import { removeMovieFromFavorites } from "../../../reducers/FavoriteMoviesReducer";
import { removeMovieFromWatched } from "../../../reducers/WatchedMoviesReducer";

// Styles
import "./UserMovies.scss";

interface Params {
  whichMovies: string;
}

const UserMovies: FunctionComponent<Params> = (Params) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedUser = useSelector((store: any) => store.loggedUser);
  let userMovies: any = null;
  const favoriteMovies = useSelector((store: any) => store.favoriteMovies);
  const watchedMovies = useSelector((store: any) => store.watchedMovies);

  Params.whichMovies.toLowerCase().includes("favorite")
    ? (userMovies = favoriteMovies)
    : (userMovies = watchedMovies);

  const handleMovieRemove = (movieId: string, movieIndex: number) => {
    if (location.pathname.toLowerCase().includes("favorite")) {
      dispatch(removeMovieFromFavorites(loggedUser.token, movieId, movieIndex));
    } else {
      dispatch(removeMovieFromWatched(loggedUser.token, movieId, movieIndex));
    }
  };
  return (
    <div className="menu-container">
      <TableContainer className="user-movies-table-container">
        <Table className="favorite-movies " aria-label="favorite movies table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Movie ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userMovies.map((movie: any, index: number) => (
              <TableRow key={movie.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{movie.movieId}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      handleMovieRemove(movie.id, index);
                    }}
                  >
                    Remove?
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MenuData />
    </div>
  );
};

export default UserMovies;
