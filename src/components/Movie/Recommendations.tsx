import { NavLink, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Loading from "../partials/Loading";
import placeholderImage from "../../assets/image/placeholder.jpg";
import Error from "../partials/Error";
import useRecommendations from "../../hooks/Movie/useRecommendations";

const Recommendations = () => {
  const { id } = useParams();
  const movieId = Number(id);

  const { data: movie, isLoading, isError } = useRecommendations(movieId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <h3>Recommendations based on chosen movie</h3>
      <ul className="movie-rec">
        {movie.results.map((rec) => (
          <NavLink to={`/movie/${rec.id}`}>
            <li key={rec.id} className="combined-credits-a">
              {rec.poster_path ? (
                <Card.Img
                  className="actor-movie-list"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w300/${rec.poster_path}`}
                />
              ) : (
                <Card.Img variant="top" src={placeholderImage} />
              )}
            </li>
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default Recommendations;
