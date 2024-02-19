import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import * as MovieAPI from "../../services/MovieAPI/MovieAPI";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import MovieListWithPagination from "./MovieListWithPagination";
import SlidingButton from "../partials/SlidingButton";
import Loading from "../partials/Loading";
import Error from "../partials/Error";

interface TrendingMoviesProps {
  selectedWindow: string;
  onToggle: (newPage: number, newTimeWindow: string) => void;
}

const TrendingMovies = ({ selectedWindow }: TrendingMoviesProps) => {
  const { currentPage, handleNavigation, handleTimeWindowToggle } =
    usePaginationFromURL();
  const queryClient = useQueryClient();

  const {
    data: movie,
    isError,
    isLoading,
  } = useQuery(
    ["trending-movies", { currentPage, timeWindow: selectedWindow }],
    () => MovieAPI.getTrending(currentPage, selectedWindow)
  );

  useEffect(() => {
    queryClient.invalidateQueries([
      "trending-movies",
      { currentPage, timeWindow: selectedWindow },
    ]);
  }, [currentPage, selectedWindow, queryClient]);

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
      <SlidingButton
        selectedWindow={selectedWindow}
        currentPage={currentPage}
        onToggle={handleTimeWindowToggle}
      />

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

export default TrendingMovies;
