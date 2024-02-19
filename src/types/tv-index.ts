import { Genre, Credits } from "./movie-index"


export type TVShow = {
    id: number,
    first_air_date: string,
    original_language: string,
    origin_country: string,
    genres: Genre[],
    name: string,
    number_of_episodes: number,
    number_of_seasons: number,
    overview: string,
    poster_path: string,
    vote_average: number,
    vote_count: number,
    status: string,
    credits: Credits
}

export type TVShowResponse = {
    page: number,
    results: TVShow[],
    total_pages: number,
    total_results: number
}

export type CombinedCreditsTV = {
    cast: TVShow[]
}

