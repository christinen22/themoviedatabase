import { TVShowResponse } from "../../types/tv-index";
import * as TVAPI from '../../services/TVAPI/TVAPI'
import { useQuery } from '@tanstack/react-query'

const useTVTopRated = (currentPage: number) => {
    return useQuery<TVShowResponse>(['toprated-tv', currentPage], () => TVAPI.getTopRatedShows(currentPage))
}

export default useTVTopRated