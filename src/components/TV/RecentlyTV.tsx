import { TVShow } from "../../types/tv-index";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const RecentlyTV = () => {
  const storedTVString: string | null =
    localStorage.getItem("recentlyVisitedTV");
  const storedTV: TVShow[] = storedTVString ? JSON.parse(storedTVString) : [];

  return (
    <>
      <h2 className="h2-rec">Recently Visited TV Shows</h2>
      <ul className="recent">
        {storedTV.map((storeTV) => (
          <NavLink to={`/tv/${storeTV.id}`}>
            <li key={storeTV.id} className="recent-li">
              <Card.Img
                className="recent-movie-list"
                variant="top"
                src={`https://image.tmdb.org/t/p/w300/${storeTV.poster_path}`}
              />
            </li>
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default RecentlyTV;
