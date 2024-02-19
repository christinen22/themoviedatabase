import { Alert } from "react-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Genre } from "../../types/movie-index";
import MovieListWithPagination from "../../components/Movie/MovieListWithPagination";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import Loading from "../../components/partials/Loading";
import Error from "../../components/partials/Error";
import useGenre from "../../hooks/Movie/useGenre";
import useMovieByGenre from "../../hooks/Movie/useMovieByGenre";
import RecentlyVisitedMovies from "../../components/Movie/RecentlyVisited";
import Search from "../../components/Search";

const MovieByGenre = () => {
  const { id } = useParams();
  const genreId = Number(id);
  const { currentPage, handleNavigation } = usePaginationFromURL();

  const {
    data: movie,
    isError,
    isLoading,
  } = useMovieByGenre(genreId, currentPage);

  const {
    data: genres,
    isError: isGenresError,
    isLoading: isGenresLoading,
  } = useGenre(genreId);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([
      "genre",
      { id: genreId, page: currentPage },
    ]);
  }, [currentPage, genreId, queryClient]);

  if (isLoading || isGenresLoading) {
    return <Loading />;
  }

  if (isError || isGenresError) {
    return <Error />;
  }

  const chosenGenre = genres.genres.find(
    (genre: Genre) => genre.id === genreId
  );

  if (movie.results.length <= 0) {
    return (
      <Alert variant="error">
        <h1>Not found</h1>
      </Alert>
    );
  }

  // make sure total_pages doesn't exceed 500
  const totalPages = Math.min(movie.total_pages, 500);

  return (
    <>
      <RecentlyVisitedMovies />
      <Search />
      <h1>Movies by Genre: {chosenGenre?.name}</h1>
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

export default MovieByGenre;
