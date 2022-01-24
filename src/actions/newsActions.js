import { LIST_NEWS, GET_SINGLE_NEWS, ERROR_CODE_500 } from './types';
import { apiRequest } from './fetchActions';
import { toast } from "react-toastify";
import { authHeader } from '../helpers/auth-header';

export const newsListing = () => async dispatch =>{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        }
        const result= await apiRequest(`v1/news`, requestOptions);
        await dispatch({type:LIST_NEWS, payload:result})
    }catch (error){
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        // dispatch({ type: ERROR_CODE_500})
    }
}

export const getSingleNewsById = (newsId)  => async dispatch => {
    // console.log(newsId)
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",

            },
        }
        const news = await apiRequest(`v1/news/${newsId}`);
        await dispatch({ type: GET_SINGLE_NEWS, payload: news })
    }catch(error){
        console.log('error',error)
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        // dispatch({ type: ERROR_CODE_500})
    }
}