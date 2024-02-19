import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import Loading from "../../components/partials/Loading";
import { Movie } from "../../types/movie-index";
import placeholderImage from "../../assets/image/placeholder.jpg";
import Error from "../../components/partials/Error";
import useActor from "../../hooks/Movie/useActor";

const SingleActor = () => {
  const { id } = useParams();
  const castId = Number(id);

  const { data: cast, isError, isLoading } = useActor(castId);

  const [showAllMovies, setShowAllMovies] = useState(false);

  if (isLoading || !cast) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  // Get the list of movies, either all or the first 10
  const moviesToDisplay = showAllMovies
    ? cast.combined_credits.cast
    : cast.combined_credits.cast.slice(0, 10);

  return (
    <Container className="single-movie-container">
      <Row className="movie-info">
        <Col className="mb-4">
          <Card className="single-movie">
            <h1>{cast.name}</h1>
            {cast.profile_path ? (
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
                className="actor-image"
              />
            ) : (
              <Card.Img
                variant="top"
                src={placeholderImage}
                className="actor-image"
              />
            )}
            <Card.Body>
              <p>{cast.biography}</p>

              <span className="h2-rec">Known for: </span>
              <ul className="movie-cred">
                {moviesToDisplay.map((movie: Movie) => (
                  <NavLink
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="combined-credits-link"
                  >
                    <li className="combined-credits-a">
                      {movie.poster_path ? (
                        <Card.Img
                          className="movie-img"
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                        />
                      ) : (
                        <Card.Img variant="top" src={placeholderImage} />
                      )}
                    </li>
                  </NavLink>
                ))}
              </ul>

              {cast.combined_credits.cast.length > 10 && (
                <Button
                  onClick={() => setShowAllMovies(!showAllMovies)}
                  className="see-all-button"
                >
                  {showAllMovies ? "Show Less" : "See All"}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleActor;
