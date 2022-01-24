import { USER_SIGNUP, USER_FORGOT_PASSWORD, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, USER_RESEND_EMAIL_VERIFICATION, SEND_QUERY } from './types';
import { apiRequest } from './fetchActions';
import { toast } from "react-toastify";
import { authHeader } from '../helpers/auth-header';

toast.configure()

export { 
    userLogin,
    userSignup,
    logout,
    resetPassword,
    sendEmailVerication,
    sendQuery
}

const userLogin = data => async dispatch => {
    try {
        const requestOptions = {
            method: 'POST',
            // mode: "cors",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(data)
        }
        const user = await apiRequest("v1/signIn", requestOptions);
        if(user.response && user.token){
            localStorage.setItem('token', JSON.stringify(user.token));
            await dispatch({ type: LOGIN_SUCCESS, payload: user })
        }else{
            await dispatch ({ type: LOGIN_FAILURE, payload: user})
        }
        
    } catch (error) {
        await dispatch ({ type: LOGIN_FAILURE, payload:error})
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    }
}

const userSignup = data => async dispatch => {
    try {
        const requestOptions = {
            method: 'POST',
            // mode: "cors",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(data)
        }
        const user = await apiRequest("v1/signUp", requestOptions);
        await dispatch({ type: USER_SIGNUP, payload: user })
    } catch (error) {
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    }
}

const logout = () => async dispatch => {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('fromLocation')
    dispatch({type:LOGOUT})
}

const resetPassword = data => async dispatch =>{
    try {
        const requestOptions = {
            method: 'POST',
            // mode: "cors",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(data)
        }
        const user = await apiRequest("reset-password", requestOptions);
        await dispatch({type:USER_FORGOT_PASSWORD, payload:user})
    }catch (error){
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    }
}

const sendEmailVerication = data => async dispatch =>{
    try {
        const requestOptions = {
            method: 'GET',
            // mode: "cors",
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }
        const user = await apiRequest(`resend-email-verification/${data.Email}`, requestOptions);
        await dispatch({ type:USER_RESEND_EMAIL_VERIFICATION, payload:user })
    }catch (error){
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    }
}

const sendQuery = data => async dispatch =>{
    try {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify( data )
        }
        const user = await apiRequest(`v1/queries`, requestOptions);
        await dispatch({ type:SEND_QUERY, payload:user })
    }catch (error){
        toast.dismiss()
        toast.error('Something Went Wrong', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    }
}



