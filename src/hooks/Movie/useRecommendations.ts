import { MovieResponse } from '../../types/movie-index'
import * as MovieAPI from '../../services/MovieAPI/MovieAPI'
import { useQuery } from '@tanstack/react-query'

const useRecommendations = (movieId: number) => {
    return useQuery<MovieResponse>(['movie-rec', { id: movieId }], () => MovieAPI.getRecommendations(movieId))
}

export default useRecommendations