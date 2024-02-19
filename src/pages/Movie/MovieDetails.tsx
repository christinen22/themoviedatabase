import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import CastComponent from "../../components/Movie/CastComponent";
import Recommendations from "../../components/Movie/Recommendations";
import Loading from "../../components/partials/Loading";
import { Genre } from "../../types/movie-index";
import { useEffect } from "react";
import { Movie } from "../../types/movie-index";
import useMovie from "../../hooks/Movie/useMovie";
import Error from "../../components/partials/Error";

const MovieDetails = () => {
  const { id } = useParams();
  const movieId = Number(id);

  const { data: movie, isLoading, isError } = useMovie(movieId);

  useEffect(() => {
    if (movie) {
      const storedMoviesString: string | null =
        localStorage.getItem("recentlyVisited");
      const storedMovies: Movie[] = storedMoviesString
        ? JSON.parse(storedMoviesString)
        : [];

      const existingMovieIndex = storedMovies.findIndex(
        (m: Movie) => m.id === movie.id
      );

      if (existingMovieIndex === -1) {
        storedMovies.unshift(movie);

        const maxStoredMovies = 10;

        if (storedMovies.length > maxStoredMovies) {
          storedMovies.pop();
        }

        localStorage.setItem("recentlyVisited", JSON.stringify(storedMovies));
      }
    }
  }, [movie]);

  if (isLoading || !movie) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Container className="single-movie-container">
      <h1>{movie.title}</h1>
      <h2 className="tagline">{movie.tagline}</h2>
      <Row className="movie-info">
        <Col xs={12} md={4}>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          />
        </Col>
        <Col xs={12} md={8}>
          <Card className="single-movie">
            <Card.Body>
              {movie.overview}
              <br />
              <br />
              Runtime {movie.runtime} min
              <br />
              <br />
              <ul className="movie-genre">
                Genre:
                {movie.genres.map((genre: Genre) => (
                  <NavLink to={`/genre/${genre.id}`}>
                    <li className="genre-movie-li" key={genre.id}>
                      {genre.name}
                    </li>
                  </NavLink>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <CastComponent />
      <Row>
        <Recommendations />
      </Row>
    </Container>
  );
};

export default MovieDetails;
