import { Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination";
import { TVShow } from "../../types/tv-index";
import placeholderImage from "../../assets/image/placeholder.jpg";

interface TVListWithPaginationProps {
  tvshows: TVShow[];
  currentPage: number;
  total_pages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const TVListWithPagination: React.FC<TVListWithPaginationProps> = ({
  tvshows,
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
        {tvshows.map((tvshow: TVShow) => (
          <Col key={tvshow.id} xs={12} md={6} lg={4} className="mb-4">
            <NavLink to={`/tv/${tvshow.id}`}>
              <Card>
                <div className="poster-wrapper">
                  {tvshow.poster_path ? (
                    <Card.Img
                      className="movie-img"
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w300/${tvshow.poster_path}`}
                    />
                  ) : (
                    <Card.Img variant="top" src={placeholderImage} />
                  )}
                </div>
                <Card.Body>
                  <Card.Title>{tvshow.name}</Card.Title>
                  <Card.Text>
                    Vote average {tvshow.vote_average}
                    <br />
                    Number of votes {tvshow.vote_count}
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

export default TVListWithPagination;
