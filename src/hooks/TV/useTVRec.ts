import { TVShowResponse } from '../../types/tv-index'
import * as TVAPI from '../../services/TVAPI/TVAPI'
import { useQuery } from '@tanstack/react-query'

const useTVRec = (showId: number) => {
    return useQuery<TVShowResponse>(['tv-rec', { id: showId }], () => TVAPI.getTVRec(showId))
}

export default useTVRec