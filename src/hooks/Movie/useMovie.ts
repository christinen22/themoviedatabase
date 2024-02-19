import { Movie } from "../../types/movie-index";
import * as MovieAPI from '../../services/MovieAPI/MovieAPI'
import { useQuery } from "@tanstack/react-query";

const useMovie = (movieId: number) => {
    return useQuery<Movie>(["movie", { id: movieId }], () => MovieAPI.getMovie(movieId));
}

export default useMovie;