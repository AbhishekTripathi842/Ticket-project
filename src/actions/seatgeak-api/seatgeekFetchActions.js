const axios = require("axios");
var SeatgeekBaseURL = process.env.REACT_APP_SEATGEEK_API_END_POINT
var TicketsBaseURL = process.env.REACT_APP_SEATGEEK_END_POINT
// console.log(TicketsBaseURL, SeatgeekBaseURL)

export const apiRequest = async (endPoint) => {
    try {
        const response = await axios.get(`${TicketsBaseURL}/${endPoint}`);
        // console.log(response.status, response.statusText)
        const result = await response.data;
        return result;
    } catch (e) {
        // console.log(e); 
        throw new Error('Somthing Went Wrong!');
    }
}

export const seatgeekApiRequest = async (endPoint) => {
    try {
        const response = await axios.get(`${SeatgeekBaseURL}/${endPoint}`);
        // console.log(response.status, response.statusText)
        const result = await response.data;
        return result;
    } catch (e) {
        // console.log(e); 
        throw new Error('Somthing Went Wrong!');
    }
}