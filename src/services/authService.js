import httpService from "./httpService";
// import axios from 'axios';

const apiLogin = 'rest-auth/login/';
const apiLogout = 'rest-auth/logout/';

export async function login(username, password){
    const res = await httpService.post(apiLogin, { username, password });
    console.log(res);
    localStorage.setItem('token', res.data.key);
}

export async function logout(){
    localStorage.removeItem('token');
    const res = await httpService.post(apiLogout);
    console.log(res);    
}

export function getToken(){
    return localStorage.getItem('token')
}