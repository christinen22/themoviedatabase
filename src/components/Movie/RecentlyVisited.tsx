import { Movie } from "../../types/movie-index";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const RecentlyVisitedMovies = () => {
  const storedMoviesString: string | null =
    localStorage.getItem("recentlyVisited");
  const storedMovies: Movie[] = storedMoviesString
    ? JSON.parse(storedMoviesString)
    : [];

  return (
    <>
      <h2 className="h2-rec">Recently Visited Movies</h2>
      <ul className="recent">
        {storedMovies.map((store) => (
          <NavLink to={`/movie/${store.id}`}>
            <li key={store.id} className="recent-li">
              <Card.Img
                className="recent-movie-list"
                variant="top"
                src={`https://image.tmdb.org/t/p/w300/${store.poster_path}`}
              />
            </li>
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default RecentlyVisitedMovies;
