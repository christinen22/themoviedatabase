import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import * as MovieAPI from "../../services/MovieAPI/MovieAPI";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import MovieListWithPagination from "./MovieListWithPagination";
import Error from "../partials/Error";

const SearchResults = () => {
  const { currentPage, handleNavigation } = usePaginationFromURL();
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();
  const query = searchParams.get("query") ?? "";

  const { data: movieSearchResult, isError: movieIsError } = useQuery(
    ["search-movies", { query, currentPage }],
    () => MovieAPI.search(query, currentPage),
    {
      enabled: !!query,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries(["search-movies", { query, currentPage }]);
  }, [currentPage, query, queryClient]);

  if (movieIsError) {
    return <Error />;
  }

  console.log(movieSearchResult);
  return (
    <>
      {movieSearchResult && (
        <div className="search-results">
          <h2>Movie Results for "{query}"</h2>

          {movieSearchResult.total_results > 0 ? (
            <MovieListWithPagination
              movies={movieSearchResult.results}
              currentPage={currentPage}
              total_pages={movieSearchResult.total_pages}
              onPreviousPage={() => {
                if (currentPage > 1) {
                  handleNavigation(currentPage - 1);
                }
              }}
              onNextPage={() => {
                if (currentPage < movieSearchResult.total_pages) {
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
export default SearchResults;
