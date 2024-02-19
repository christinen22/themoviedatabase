import { MovieResponse } from '../../types/movie-index'
import * as MovieAPI from '../../services/MovieAPI/MovieAPI'
import { useQuery } from '@tanstack/react-query'

const useTopRated = (currentPage: number) => {
    return useQuery<MovieResponse>(['toprated-movie', currentPage], () => MovieAPI.getTopRatedMovies(currentPage))
}

export default useTopRated