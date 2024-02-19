import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import TVListWithPagination from "../../components/TV/TVListWithPagination";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import Loading from "../../components/partials/Loading";
import Error from "../../components/partials/Error";
import useTVTopRated from "../../hooks/TV/useTVTopRated";
import RecentlyTV from "../../components/TV/RecentlyTV";
import SearchTV from "../../components/TV/SearchTV";

const TVTopRated = () => {
  const { currentPage, handleNavigation } = usePaginationFromURL();
  const queryClient = useQueryClient();

  const { data: tvshow, isError, isLoading } = useTVTopRated(currentPage);

  useEffect(() => {
    queryClient.invalidateQueries(["toprated-tv", { currentPage }]);
  }, [currentPage, queryClient]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  // make sure total_pages doesn't exceed 500
  const totalPages = Math.min(tvshow.total_pages, 500);

  return (
    <>
      <RecentlyTV />
      <SearchTV />
      <h1>Top Rated TV-shows</h1>
      <TVListWithPagination
        tvshows={tvshow.results}
        currentPage={currentPage}
        total_pages={totalPages}
        onPreviousPage={() => {
          if (currentPage > 1) {
            handleNavigation(currentPage - 1);
          }
        }}
        onNextPage={() => {
          if (currentPage < tvshow.total_pages) {
            handleNavigation(currentPage + 1);
          }
        }}
      />
    </>
  );
};

export default TVTopRated;
