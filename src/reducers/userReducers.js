import { 
    USER_SIGNUP,
    USER_FORGOT_PASSWORD,
    USER_RESEND_EMAIL_VERIFICATION, 
    SEND_QUERY 
} from "../actions/types";

const initialState = { user: '', query:'' }

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP:
            return {
                ...state,
                user: action.payload
            }
        case USER_RESEND_EMAIL_VERIFICATION:
            return {
                ...state,
                user:action.payload
            }
        case USER_FORGOT_PASSWORD:
            return {
                ...state,
                user:action.payload
            }
        case SEND_QUERY:
            return {
                ...state,
                query: action.payload
            }
        default:
            return state;
    }
}
