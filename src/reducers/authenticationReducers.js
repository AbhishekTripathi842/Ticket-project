import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from "../actions/types";
import { isLoggedIn, decodedToken } from '../helpers/decode-token';
// let token = JSON.parse(sessionStorage.getItem('token'))
const initialState = decodedToken ? { loggedIn: isLoggedIn, decodedToken } : {};

export default (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            loggedIn:true,
            user: action.payload
        };
    case LOGIN_FAILURE:
        return {
            ...state,
            loggedIn:false,
            user:action.payload
        };
    case LOGOUT:
        return {};
    default:
        return state
    }
}