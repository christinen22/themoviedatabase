import { Card } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import { Cast } from "../../types/movie-index";
import Loading from "../partials/Loading";
import Error from "../partials/Error";
import placeholderImage from "../../assets/image/placeholder.jpg";
import useMovie from "../../hooks/Movie/useMovie";

const CastComponent = () => {
  const { id } = useParams();
  const movieId = Number(id);

  const { data: movie, isError, isLoading } = useMovie(movieId);

  if (isError) {
    return <Error />;
  }

  if (isLoading || !movie) {
    return <Loading />;
  }

  return (
    <>
      <h3>Cast</h3>
      <ul className="movie-cast">
        {movie.credits.cast.slice(0, 11).map((cast: Cast) => (
          <NavLink to={`cast/${cast.id}`}>
            <li key={cast.id} className="combined-credits-a">
              {cast.profile_path ? (
                <Card.Img
                  className="actor-movie-list"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
                />
              ) : (
                <Card.Img variant="top" src={placeholderImage} />
              )}

              <span>{cast.name}</span>
            </li>
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default CastComponent;
