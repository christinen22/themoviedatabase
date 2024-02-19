import axios from "axios";
import { MovieResponse, Movie, Genres, CastDetails } from "../../types/movie-index";


const API_KEY = import.meta.env.VITE_APP_MOVIE_API_KEY
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    timeout: 10000,

})

const get = async<T>(endpoint: string) => {
    const res = await instance.get<T>(endpoint)

    return res.data
}

/**
 * Get top rated movies
 * @returns 
 */

export const getTopRatedMovies = (page: number) => {
    return get<MovieResponse>(`movie/top_rated?api_key=${API_KEY}&include_adult=false&page=${page}`);
}

/**
 * 
 * @returns Get latest movies
 */

export const getLatestMovies = (page: number) => {
    return get<MovieResponse>(`movie/now_playing?api_key=${API_KEY}&include_adult=false&page=${page}&append_to_response=credits`)
}

/**
 * Get single movie
 * @param movie_id 
 * @returns 
 */

export const getMovie = (movie_id: number) => {
    return get<Movie>(`/movie/${movie_id}?api_key=${API_KEY}&append_to_response=credits`)
}

/**
 * Get Popular movies
 * @param page 
 * @returns 
 */
export const getPopularMovies = (page: number) => {
    return get<MovieResponse>(`movie/popular?api_key=${API_KEY}&include_adult=false&page=${page}`)
}


/**
 * Get movie by genre
 * @param page 
 * @param genre_id 
 * @returns 
 */
export const getMoviesByGenre = (genre_id: number, page: number) => {
    return get<MovieResponse>(`discover/movie?api_key=${API_KEY}&include_adult=false&page=${page}&with_genres=${genre_id}`)
}


/**
 * Get genre
 * @param genre_id 
 * @returns 
 */
export const getGenres = () => {
    return get<Genres>(`genre/movie/list?api_key=${API_KEY}`)
}


/**
 * Get details cast
 * @param cast_id 
 * @returns 
 */
export const getCastDetails = (cast_id: number) => {
    return get<CastDetails>(`person/${cast_id}?api_key=${API_KEY}&append_to_response=combined_credits`)
}


/**
 * Get recommendations of specific movie
 * @param movie_id 
 * @returns 
 */
export const getRecommendations = (movie_id: number) => {
    return get<MovieResponse>(`movie/${movie_id}/recommendations?api_key=${API_KEY}`)
}


/**
 * Search movie
 * @param query 
 * @param page 
 * @returns 
 */
export const search = (query: string, page: number) => {
    return get<MovieResponse>(`/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&page=${page}`)
}


/**
 * Get trending
 * @param page 
 * @param time_window 
 * @returns 
 */
export const getTrending = (page: number, time_window: string) => {
    return get<MovieResponse>(`trending/movie/${time_window}?language=en-US&api_key=${API_KEY}&include_adult=false&page=${page}`)
}