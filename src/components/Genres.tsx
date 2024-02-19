import { Link } from "react-router-dom";
import Loading from "./partials/Loading";
import { Container } from "react-bootstrap";
import Error from "./partials/Error";
import useGenre from "../hooks/Movie/useGenre";
import { useParams } from "react-router-dom";

const Genres = () => {
  const { id } = useParams();
  const genreId = Number(id);

  const { data: genres, isLoading, isError } = useGenre(genreId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Container className="genre-container">
      <ul className="genre-list">
        {genres.genres.map((genre) => (
          <li key={genre.id}>
            <Link className="genre-link" to={`/genre/${genre.id}`}>
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Genres;
