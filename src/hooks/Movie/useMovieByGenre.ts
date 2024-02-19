import { MovieResponse } from '../../types/movie-index'
import * as MovieAPI from '../../services/MovieAPI/MovieAPI'
import { useQuery } from '@tanstack/react-query'

const useMovieByGenre = (genreId: number, currentPage: number) => {

    return useQuery<MovieResponse>(['genre', { id: genreId, currentPage }], () => MovieAPI.getMoviesByGenre(genreId, currentPage))
}

export default useMovieByGenre;