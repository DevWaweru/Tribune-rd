import httpService from "./httpService";
// import axios from 'axios';

const apiLogin = 'rest-auth/login/';
const apiLogout = 'rest-auth/logout/';
const apiRegister = 'rest-auth/registration/';
const apiUpdatePassword = 'rest-auth/password/change/';

export async function login(username, password){
    const res = await httpService.post(apiLogin, { username, password });
    localStorage.setItem('token', res.data.key);
}

export async function register(data){
    const res = await httpService.post(apiRegister, data);
    localStorage.setItem('token', res.data.key);
}

export async function updatePassword(password1, password2){
    await httpService.post(apiUpdatePassword, { password1, password2 });
}

export async function logout(){
    localStorage.removeItem('token');
    await httpService.post(apiLogout);    
}

export function getToken(){
    return localStorage.getItem('token')
}