import { toast } from "react-toastify";
const axios = require("axios");
var BaseURL = process.env.REACT_APP_END_POINT;
toast.configure()

// const getData = async (url) => {
//     try {
//         const response = await fetch(`${BaseURL}/${url}`, 
//         { headers: authHeader() }
//         );
//         const result = await response.json();
//         return result;
//     } catch (e) {
//         console.log(e);
//         throw new Error('Something Went Wrong!');
//     }
// }
const apiRequest = async (url, requestOptions) => {
    try {
        const response = await fetch(`${BaseURL}/${url}`, requestOptions);
        const result = await response.json();
        console.log(result)
        return result;
    } catch (e) {
        console.log("erroooo",e);
        throw new Error('Somthing Went Wrong!');
    }
}


const checkTokenExpire = (result) => {
    console.log('seesion',result)
    if(result && result.error && result.error.name === 'TokenExpiredError'){
        // toast.dismiss()
        // toast.error("Session Time Out", { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        localStorage.clear();
        setTimeout(() => {
            // window.location.replace('/sign-in')
        }, 1000)
    }
}
// const postDataAndImage = async (url, formData) => {
//     try {
//         const config = {
//             mode: "cors",
//             headers: {
//                 "Content-Type": "multipart/form-data; charset=utf-8;",
//             }
//         }
//         const response = await axios.patch(`${BaseURL}/${url}`, formData, config)
//         const result = await response.data;
//         return result;
//     } catch (e) {
//         console.log(url, e)
//         throw new Error('Something Went Wrong!');
//     }
// }

export { 
    // getData, 
    apiRequest, 
    checkTokenExpire,
    // postDataAndImage
};