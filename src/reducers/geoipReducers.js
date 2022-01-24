import { GET_GEOIP_EVENTS_SUCCESS } from "../actions/types";

const initialState = { eventsByLocation: '' }

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GEOIP_EVENTS_SUCCESS:
            return {
                ...state,
                eventsByLocation: action.payload
            }
        default:
            return state;
    }
}
