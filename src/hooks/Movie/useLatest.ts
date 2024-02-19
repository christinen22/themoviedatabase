import { MovieResponse } from '../../types/movie-index'
import * as MovieAPI from '../../services/MovieAPI/MovieAPI'
import { useQuery } from '@tanstack/react-query'

const useLatest = (currentPage: number) => {
    return useQuery<MovieResponse>(['latest-movie', { currentPage }], () => MovieAPI.getLatestMovies(currentPage))
}

export default useLatest