import { CREATE_TICKET_LISTING, EVENT_TICKETS_LISTING, LIST_TICKETS_FOR_SALE, REMOVE_TICKET_FROM_LISTING, LIST_PURCHASED_TICKETS, REMOVE_UPLOADED_FILE } from './types';
import { apiRequest, checkTokenExpire } from './fetchActions';
import { toast } from "react-toastify";
import { authHeader } from '../helpers/auth-header';

toast.configure()

export { 
    uploadTicketListing,
    eventTicketListing,
    listTicketsForSale,
    removeFromListing,
    listPurchasedTickets,
    removeUploadedFile
}

const uploadTicketListing = data => async dispatch =>{
    console.log(data)
    try {
        const requestOptions = {
            method: 'POST',
            // mode: "cors",
            body:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authHeader()
            },
        }
        const listingTicket= await apiRequest("v1/sell/ticket-listing", requestOptions);
        checkTokenExpire(listingTicket);
        await dispatch({type:CREATE_TICKET_LISTING, payload:listingTicket})
    }catch (error){

        if(error && error.status === 401){
            checkTokenExpire(error.data)
        }else{
            toast.dismiss()
            toast.error("Something went wrong", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true})
        }
        
    }
}

const removeUploadedFile = file => async dispatch => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authHeader()
            },
        }
        const result= await apiRequest(`v1/unlink-file/${file}`, requestOptions);
        checkTokenExpire(result);
        await dispatch({type:REMOVE_UPLOADED_FILE, payload:result})
    }catch (error){
        if(error && error.status === 401){
            checkTokenExpire(error.data)
        }else{
            toast.dismiss()
            toast.error("Something went wrong", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true})
        }
    }
}

const eventTicketListing = eventId => async dispatch =>{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        }
        const listingTickets= await apiRequest(`v1/event/${eventId}/tickets`, requestOptions);
        await dispatch({type:EVENT_TICKETS_LISTING, payload:listingTickets})
    }catch (error){
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    }
}

const listTicketsForSale = () => async dispatch =>{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authHeader()
            },
        }
        const saleTickets= await apiRequest("v1/sell/user-tickets-for-sale", requestOptions);
        checkTokenExpire(saleTickets);
        await dispatch({type:LIST_TICKETS_FOR_SALE, payload:saleTickets})
    }catch (error){
        if(error && error.status === 401){
            checkTokenExpire(error.data)
        }else{
            toast.dismiss()
            toast.error("Something went wrong", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true})
        }
    }
}

const listPurchasedTickets = () => async dispatch =>{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authHeader()
            },
        }
        const purchasedTickets= await apiRequest(`v1/user-purchased-tickets/`, requestOptions);
        checkTokenExpire(purchasedTickets);
        await dispatch({type:LIST_PURCHASED_TICKETS, payload:purchasedTickets})
    }catch (error){
        console.log('error',error)
        if(error && error.status === 401){
            checkTokenExpire(error.data)
        }else{
            toast.dismiss()
            toast.error("Something went wrong", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true})
        }
    }
}


const removeFromListing = (ticketId) => async dispatch =>{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authHeader()
            },
        }
        const deleteTicket= await apiRequest(`v1/sell/remove-ticket-listing/${ticketId}`, requestOptions);
        checkTokenExpire(deleteTicket);
        await dispatch({type:REMOVE_TICKET_FROM_LISTING, payload:deleteTicket})
    }catch (error){
        if(error && error.status === 401){
            checkTokenExpire(error.data)
        }else{
            toast.dismiss()
            toast.error("Something went wrong", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true})
        }
    }
}

