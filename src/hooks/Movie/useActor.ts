import { CastDetails } from "../../types/movie-index";
import * as MovieAPI from '../../services/MovieAPI/MovieAPI'
import { useQuery } from "@tanstack/react-query";

const useActor = (castId: number) => {
    return useQuery<CastDetails>(['cast', { id: castId }], () => MovieAPI.getCastDetails(castId))
}

export default useActor