import { 
    LIST_NEWS, GET_SINGLE_NEWS
 } from "../actions/types";
 
 const initialState = {
     news: '',single_news:''
 }
 
 export default (state = initialState, action) => {
     switch (action.type) {
        case LIST_NEWS:
            return {
                ...state,
                news: action.payload
            }
        case GET_SINGLE_NEWS:
            return {
                ...state,
                single_news: action.payload
            }
         default:
             return state;
     }
 }