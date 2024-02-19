import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TVRecommendations from "../../components/TV/TVRecommendations";
import TVCast from "../../components/TV/TVCast";
import Loading from "../../components/partials/Loading";
import { Genre } from "../../types/movie-index";
import { useEffect } from "react";
import { TVShow } from "../../types/tv-index";
import useTVSHow from "../../hooks/TV/useTVShow";
import Error from "../../components/partials/Error";

const TVDetails = () => {
  const { id } = useParams();
  const showId = Number(id);

  const { data: tvshow, isError, isLoading } = useTVSHow(showId);

  useEffect(() => {
    if (tvshow) {
      const storedTVString: string | null =
        localStorage.getItem("recentlyVisitedTV");
      const storedTV: TVShow[] = storedTVString
        ? JSON.parse(storedTVString)
        : [];

      const existingTVIndex = storedTV.findIndex(
        (t: TVShow) => t.id === tvshow.id
      );

      if (existingTVIndex === -1) {
        storedTV.unshift(tvshow);

        const maxStoredTV = 10;

        if (storedTV.length > maxStoredTV) {
          storedTV.pop();
        }

        localStorage.setItem("recentlyVisitedTV", JSON.stringify(storedTV));
      }
    }
  }, [tvshow]);

  if (isLoading || !tvshow) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Container className="single-movie-container">
      <h1>{tvshow.name}</h1>
      <Row className="movie-info">
        <Col xs={12} md={4}>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w300/${tvshow.poster_path}`}
          />
        </Col>
        <Col xs={12} md={8}>
          <Card className="single-movie">
            <Card.Body>
              {tvshow.overview}
              <br />
              <br />
              First air date {tvshow.first_air_date}
              <br />
              Number of seasons: {tvshow.number_of_seasons}
              <br />
              Number of episodes: {tvshow.number_of_episodes}
              <br />
              Origin: {tvshow.origin_country}
              <br />
              Status: {tvshow.status}
              <br />
              <br />
              <ul className="movie-genre">
                Genre:
                {tvshow.genres.map((genre: Genre) => (
                  <li className="genre-movie-li" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <TVCast />
      <Row>
        <TVRecommendations />
      </Row>
    </Container>
  );
};

export default TVDetails;
