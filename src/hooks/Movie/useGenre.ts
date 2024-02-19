import { Genres } from '../../types/movie-index'
import * as MovieAPI from '../../services/MovieAPI/MovieAPI'
import { useQuery } from '@tanstack/react-query'

const useGenre = (genreId: number) => {
    return useQuery<Genres>(['genre', { id: genreId }], () => MovieAPI.getGenres())
}

export default useGenre;