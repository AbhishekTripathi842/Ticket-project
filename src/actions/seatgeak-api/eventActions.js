import { GET_TAXONOMY_SUCCESS, GET_SINGLE_EVENT_SUCCESS, GET_GEOIP_EVENTS_SUCCESS, ERROR_CODE_500, GET_RESULT_ON_HOME_SEARCH, GET_EVENTS_BY_RECOMENDATIONS } from '../types';
import { seatgeekApiRequest, apiRequest } from './seatgeekFetchActions';
import { toast } from "react-toastify";
toast.configure();
const CLIENT_ID = process.env.REACT_APP_SEATGEEK_CLIENT_API_KEY
const stableIp = "98.213.245.205";
const autoDetect = true 
const GEO_IP_DETECT = autoDetect

const check15daysFromNow = () => {
    let d = new Date();
    let sevenDaysFromNow = d.setDate(d.getDate() + 15);
    return new Date(sevenDaysFromNow).toISOString().split('T')[0]
}

export const getEventByTaxomonies = (taxonomy, pageNumber)  => async dispatch => {
    try{
        // const events = await seatgeekApiRequest(`events?page=${pageNumber}&taxonomies.name=${taxonomy}&client_id=${CLIENT_ID}`);
        const events = await apiRequest(`events?page=${pageNumber}&taxonomies.name=${taxonomy}`);
        await dispatch({ type: GET_TAXONOMY_SUCCESS, payload: events })
    }catch(error){
        console.log(error)
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        dispatch({ type: ERROR_CODE_500}) // current not in use
    }
}

export const getSingleEventById = (eventId)  => async dispatch => {
    try{
        // const event = await seatgeekApiRequest(`events/${eventId}?client_id=${CLIENT_ID}`);
        const event = await apiRequest(`events/${eventId}`);
        await dispatch({ type: GET_SINGLE_EVENT_SUCCESS, payload: event })
    }catch(error){
        console.log(error)
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        dispatch({ type: ERROR_CODE_500}) // current not in use
    }
}

//------------- used for upcoming events --------//
export const getEventsByGeoIP = (pageNumber)  => async dispatch => {
    try{
        // 98.213.245.205
        const location = await seatgeekApiRequest(`events?geoip=${GEO_IP_DETECT}&datetime_utc.lte=${check15daysFromNow()}&page=${pageNumber}&per_page=6&client_id=${CLIENT_ID}`);
        // const location = await apiRequest(`events?geoip=${GEO_IP_DETECT}&datetime_utc.lte=${check15daysFromNow()}&page=${pageNumber}&per_page=6`);
        await dispatch({ type: GET_GEOIP_EVENTS_SUCCESS, payload: location })
    }catch(error){
        console.log(error)
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        dispatch({ type: ERROR_CODE_500}) // current not in use
    }
}

export const getEventsOnSearch = (searchQuery, pageNumber) => async dispatch => {
    try{
        // const searchResult = await seatgeekApiRequest(`events?q=${searchQuery}&page=${pageNumber}&client_id=${CLIENT_ID}`);
        const searchResult = await apiRequest(`events?q=${searchQuery}&page=${pageNumber}`);
        await dispatch({ type: GET_RESULT_ON_HOME_SEARCH, payload: searchResult })
    }catch(error){
        console.log(error)
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        dispatch({ type: ERROR_CODE_500}) // current not in use
    }
}

export const getRecomendedEvents = (eventId) => async dispatch => {
    try{
        // const result = await seatgeekApiRequest(`recommendations?geoip=${GEO_IP_DETECT}&events.id=${eventId}&per_page=60&client_id=${CLIENT_ID}`);
        const result = await apiRequest(`recommendations?geoip=${GEO_IP_DETECT}&events.id=${eventId}&per_page=60`);
        await dispatch({ type: GET_EVENTS_BY_RECOMENDATIONS, payload: result })
    }catch(error){
        console.log(error)
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        dispatch({ type: ERROR_CODE_500}) // current not in use
    }
}



