import { Row, Col, Card } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import { Cast } from "../../types/movie-index";
import Loading from "../../components/partials/Loading";
import useMovie from "../../hooks/Movie/useMovie";
import Error from "../../components/partials/Error";

const MovieCast = () => {
  const { id } = useParams();
  const movieId = Number(id);

  const { data: movie, isLoading, isError } = useMovie(movieId);

  if (isLoading || !movie) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="justify-content-center">
      <h3>Cast:</h3>

      {movie.credits.cast.map((cast: Cast) => (
        <Col key={cast.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="cast-card">
            <NavLink to={`/movie/${movie.id}/cast/${cast.id}`}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
              />
            </NavLink>
            <Card.Header>{cast.name}</Card.Header>
            <Card.Body>Acts as {cast.character}</Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MovieCast;
