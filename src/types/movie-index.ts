
export type Movie = {
    adult: boolean,
    backdrop_path: string,
    genres: Genre[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    total_pages: number,
    tagline: string,
    runtime: number,
    credits: Credits,


}

export type Credits = {
    cast: Cast[]
}

export type CombinedCredits = {
    cast: Movie[]
}

export type MovieResponse = {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}

export type Cast = {
    id: number,
    known_for_department: string,
    name: string,
    profile_path: string,
    character: string
}

export type CastDetails = {
    biography: string,
    birthday: string,
    name: string,
    place_of_birth: string,
    profile_path: string
    combined_credits: CombinedCredits
}



export type Genre = {
    id: number,
    name: string
}

export type Genres = {
    genres: Genre[]
}