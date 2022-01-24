import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from '../reducers';
import promise from "redux-promise-middleware";
const initialState = {};

/**
 * create store and apply thunk and use promise middleware
 */
export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, promise)
)