import  jwt_decode  from 'jwt-decode';
// var BaseURL = process.env.REACT_APP_BASE_URL;
// let path = `${match.url}`;
// console.log('path',path)
let token = JSON.parse(localStorage.getItem('token')) || null
// console.log("check Token", token)
export const isLoggedIn = token ? true : false

export const decodedToken = token ?  jwt_decode(token) : null 