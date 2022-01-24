import { GET_TAXONOMY_SUCCESS, GET_TAXONOMY_FAILURE, GET_SINGLE_EVENT_SUCCESS } from "../actions/types";

const initialState = { eventsByCategory: '' }

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TAXONOMY_SUCCESS:
            return {
                ...state,
                eventsByCategory: action.payload
            }
        case GET_TAXONOMY_FAILURE:
            return {
                ...state,
                eventsByCategory: action.payload
            }
        case GET_SINGLE_EVENT_SUCCESS:
            return {
                ...state,
                eventsByCategory: action.payload
            }
        default:
            return state;
    }
}