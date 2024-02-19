import { Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination";
import { Movie } from "../../types/movie-index";
import placeholderImage from "../../assets/image/placeholder.jpg";

interface MovieListWithPaginationProps {
  movies: Movie[];
  currentPage: number;
  total_pages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const MovieListWithPagination: React.FC<MovieListWithPaginationProps> = ({
  movies,
  currentPage,
  total_pages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <>
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        xl={5}
        className="justify-content-center"
      >
        {movies.map((movie: Movie) => (
          <Col key={movie.id} xs={12} md={6} lg={4} className="mb-4">
            <NavLink to={`/movie/${movie.id}`}>
              <Card className="movie-list">
                <div className="poster-wrapper">
                  {movie.poster_path ? (
                    <Card.Img
                      className="movie-img"
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    />
                  ) : (
                    <Card.Img variant="top" src={placeholderImage} />
                  )}
                </div>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    Released {movie.release_date}
                    <br />
                    Average vote {movie.vote_average}
                  </Card.Text>
                </Card.Body>
              </Card>
            </NavLink>
          </Col>
        ))}
      </Row>
      <Pagination
        currentPage={currentPage}
        total_pages={total_pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </>
  );
};

export default MovieListWithPagination;
