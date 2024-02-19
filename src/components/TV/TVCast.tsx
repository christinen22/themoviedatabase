import { Card } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import { Cast } from "../../types/movie-index";
import Loading from "../partials/Loading";
import Error from "../partials/Error";
import placeholderImage from "../../assets/image/placeholder.jpg";
import useTVSHow from "../../hooks/TV/useTVShow";

const TVCast = () => {
  const { id } = useParams();
  const showId = Number(id);

  const { data: tvshow, isError, isLoading } = useTVSHow(showId);

  if (isError) {
    return <Error />;
  }

  if (isLoading || !tvshow) {
    return <Loading />;
  }

  return (
    <>
      <h3>Cast</h3>
      <ul className="movie-cast">
        {tvshow.credits.cast.slice(0, 11).map((tvcast: Cast) => (
          <NavLink to={`/tv/${tvshow.id}/cast/${tvcast.id}`}>
            <li key={tvcast.id} className="combined-credits-a">
              {tvcast.profile_path ? (
                <Card.Img
                  className="actor-movie-list"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w300/${tvcast.profile_path}`}
                />
              ) : (
                <Card.Img variant="top" src={placeholderImage} />
              )}

              <span>{tvcast.name}</span>
            </li>
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default TVCast;
