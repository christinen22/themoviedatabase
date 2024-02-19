import { MovieResponse } from '../../types/movie-index'
import * as MovieAPI from '../../services/MovieAPI/MovieAPI'
import { useQuery } from '@tanstack/react-query'

const usePopular = (currentPage: number) => {
    return useQuery<MovieResponse>(['popular-movie', currentPage], () => MovieAPI.getPopularMovies(currentPage))
}

export default usePopular