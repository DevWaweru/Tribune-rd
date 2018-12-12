import httpService from "./httpService";
// import axios from 'axios';

const apiLogin = 'rest-auth/login/';
const apiLogout = 'rest-auth/logout/';
const apiUpdatePassword = 'rest-auth/password/change/';

export async function login(username, password){
    const res = await httpService.post(apiLogin, { username, password });
    console.log(res);
    localStorage.setItem('token', res.data.key);
}

export async function updatePassword(password1, password2){
    const res = await httpService.post(apiUpdatePassword, { password1, password2 });
    console.log(res);
}

export async function logout(){
    localStorage.removeItem('token');
    const res = await httpService.post(apiLogout);
    console.log(res);    
}

export function getToken(){
    return localStorage.getItem('token')
}