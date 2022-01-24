import { GET_EVENTS_BY_RECOMENDATIONS } from "../actions/types";

const initialState = { recomendedResults: '' }

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS_BY_RECOMENDATIONS:
            return {
                ...state,
                recomendedResults: action.payload
            }
        default:
            return state;
    }
}