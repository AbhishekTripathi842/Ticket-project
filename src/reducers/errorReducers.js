import { ERROR_CODE_500 } from "../actions/types";

const initialState = { isError: false}

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR_CODE_500:
            return {
                ...state,
                isError:true
            }
        default:
            return state;
    }
}