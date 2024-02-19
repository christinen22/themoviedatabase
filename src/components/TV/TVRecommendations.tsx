import { NavLink, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Loading from "../partials/Loading";
import placeholderImage from "../../assets/image/placeholder.jpg";
import Error from "../partials/Error";
import useTVRec from "../../hooks/TV/useTVRec";

const TVRecommendations = () => {
  const { id } = useParams();
  const showId = Number(id);

  const { data: tvshow, isError, isLoading } = useTVRec(showId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <h3>Recommendations based on chosen show</h3>
      <ul className="movie-rec">
        {tvshow.results.map((rectv) => (
          <NavLink to={`/tv/${rectv.id}`}>
            <li key={rectv.id} className="combined-credits-a">
              {rectv.poster_path ? (
                <Card.Img
                  className="actor-movie-list"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w300/${rectv.poster_path}`}
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

export default TVRecommendations;
