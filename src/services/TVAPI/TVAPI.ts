import axios from "axios";
import { TVShow, TVShowResponse } from "../../types/tv-index";


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
 * TV Show by ID
 * @param show_id 
 * @returns 
 */
export const getTVShow = (show_id: number) => {
    return get<TVShow>(`tv/${show_id}?api_key=${API_KEY}&append_to_response=credits`)
}


/**
 * Top rated TV
 * @param page 
 * @returns 
 */

export const getTopRatedShows = (page: number) => {
    return get<TVShowResponse>(`tv/top_rated?api_key=${API_KEY}&page=${page}`)
}


/**
 * Get recommendations
 * @param show_id 
 * @returns 
 */
export const getTVRec = (show_id: number) => {
    return get<TVShowResponse>(`tv/${show_id}/recommendations?api_key=${API_KEY}`)
}

export const searchTV = (query: string, page: number) => {
    return get<TVShowResponse>(`/search/tv?query=${query}&api_key=${API_KEY}&include_adult=false&page=${page}`)
}