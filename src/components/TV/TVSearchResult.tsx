import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import * as TVAPI from "../../services/TVAPI/TVAPI";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import TVListWithPagination from "./TVListWithPagination";
import Error from "../partials/Error";

const TVSearchResult = () => {
  const { currentPage, handleNavigation } = usePaginationFromURL();
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();
  const query = searchParams.get("query") ?? "";

  const { data: tvShowSearchResult, isError: tvShowIsError } = useQuery(
    ["search-tvshows", { query, currentPage }],
    () => TVAPI.searchTV(query, currentPage),
    {
      enabled: !!query,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries(["search-tvshows", { query, currentPage }]);
  }, [currentPage, query, queryClient]);

  if (tvShowIsError) {
    return <Error />;
  }

  return (
    <>
      {tvShowSearchResult && (
        <div className="search-results">
          <h2>TV Show Results for "{query}"</h2>

          {tvShowSearchResult.total_results > 0 ? (
            <TVListWithPagination
              tvshows={tvShowSearchResult.results}
              currentPage={currentPage}
              total_pages={tvShowSearchResult.total_pages}
              onPreviousPage={() => {
                if (currentPage > 1) {
                  handleNavigation(currentPage - 1);
                }
              }}
              onNextPage={() => {
                if (currentPage < tvShowSearchResult.total_pages) {
                  handleNavigation(currentPage + 1);
                }
              }}
            />
          ) : (
            <p className="no-result"> No results</p>
          )}
        </div>
      )}
    </>
  );
};

export default TVSearchResult;
