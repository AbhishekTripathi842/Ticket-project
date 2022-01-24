import { 
   CREATE_TICKET_LISTING, EVENT_TICKETS_LISTING, LIST_PURCHASED_TICKETS, LIST_TICKETS_FOR_SALE, REMOVE_TICKET_FROM_LISTING, REMOVE_UPLOADED_FILE
} from "../actions/types";

const initialState = {
    sellticket: '', deleteTicket:'', purchasedTicktes:'', removeFile:''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TICKET_LISTING:
            return {
                ...state,
                sellticket: action.payload
            }
        case REMOVE_UPLOADED_FILE:
            return{
                ...state,
                removeFile:action.payload
            }
        case EVENT_TICKETS_LISTING:
            return {
                ...state,
                sellticket: action.payload
            }
        case LIST_TICKETS_FOR_SALE:
            return {
                ...state,
                sellticket: action.payload
            }
        case REMOVE_TICKET_FROM_LISTING:
            return {
                ...state,
                deleteTicket: action.payload
            }
        case LIST_PURCHASED_TICKETS:
            return {
                ...state,
                purchasedTickets: action.payload
            }
        default:
            return state;
    }
}
