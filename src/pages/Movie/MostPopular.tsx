import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import MovieListWithPagination from "../../components/Movie/MovieListWithPagination";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import Loading from "../../components/partials/Loading";
import Error from "../../components/partials/Error";
import usePopular from "../../hooks/Movie/usePopular";
import RecentlyVisitedMovies from "../../components/Movie/RecentlyVisited";
import Search from "../../components/Search";

const MostPopular = () => {
  const queryClient = useQueryClient();
  const { currentPage, handleNavigation } = usePaginationFromURL();

  const { data: movie, isError, isLoading } = usePopular(currentPage);

  useEffect(() => {
    queryClient.invalidateQueries(["popular-movies", { currentPage }]);
  }, [currentPage, queryClient]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  // make sure total_pages doesn't exceed 500
  const totalPages = Math.min(movie.total_pages, 500);

  return (
    <>
      <RecentlyVisitedMovies />
      <Search />
      <h1>Popular Movies</h1>
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

export default MostPopular;
