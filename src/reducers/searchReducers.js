import { GET_RESULT_ON_HOME_SEARCH } from "../actions/types";

const initialState = { results: '' }

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RESULT_ON_HOME_SEARCH:
            return {
                ...state,
                results: action.payload
            }
        default:
            return state;
    }
}