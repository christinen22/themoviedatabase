import { Alert } from "react-bootstrap";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import MovieListWithPagination from "../../components/Movie/MovieListWithPagination";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import Loading from "../../components/partials/Loading";
import Error from "../../components/partials/Error";
import useLatest from "../../hooks/Movie/useLatest";
import RecentlyVisitedMovies from "../../components/Movie/RecentlyVisited";
import Search from "../../components/Search";

const Latest = () => {
  const { currentPage, handleNavigation } = usePaginationFromURL();
  const queryClient = useQueryClient();

  const { data: movie, isError, isLoading } = useLatest(currentPage);

  useEffect(() => {
    queryClient.invalidateQueries(["latest-movies", { currentPage }]);
  }, [currentPage, queryClient]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  // make sure total_pages doesn't exceed 500
  const totalPages = Math.min(movie.total_pages, 500);

  if (currentPage > movie.total_pages) {
    return (
      <Alert variant="error">
        <h1>Not found</h1>
      </Alert>
    );
  }

  return (
    <>
      <RecentlyVisitedMovies />
      <Search />
      <h1>Latest Movies</h1>
      <MovieListWithPagination
        movies={movie.results}
        currentPage={currentPage}
        total_pages={totalPages}
        onPreviousPage={() => {
          if (currentPage > 1) {
            handleNavigation(currentPage - 1);
          }
        }}
        onNextPage={() => {
          if (currentPage < movie.total_pages) {
            handleNavigation(currentPage + 1);
          }
        }}
      />
    </>
  );
};
export default Latest;
