import { combineReducers } from "redux";
import userReducers from "./userReducers";
import authenticationReducers from "./authenticationReducers";
import eventsReducers from './eventsReducers';
import geoipReducers  from './geoipReducers';
import errorReducers from './errorReducers';
import searchReducers from './searchReducers';
import recomendationReducers from './recomendationReducers';
import ticketListingReducers from './ticketListingReducers';
import newsReducers from './newsReducers';

export default combineReducers({
    user: userReducers,
    authentication: authenticationReducers,
    eventsByToxonomy: eventsReducers,
    nearByEvents: geoipReducers,
    errorOccured:errorReducers,
    search:searchReducers,
    recomendation:recomendationReducers,
    listingResponse:ticketListingReducers,
    news: newsReducers,
})