import { TVShow } from "../../types/tv-index";
import * as TVAPI from '../../services/TVAPI/TVAPI'
import { useQuery } from "@tanstack/react-query";

const useTVSHow = (showId: number) => {
    return useQuery<TVShow>(['tv-show', { id: showId }], () => TVAPI.getTVShow(showId))
}

export default useTVSHow;