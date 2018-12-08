import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
const token = localStorage.getItem('token');

export async function getApiData(endpoint){
    if (token){
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };
        const data = await axios.get(endpoint);
        return data;
    } else{
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
        };
        try{
            const data = await axios.get(endpoint);
            return data;
        }catch (ex){
            console.log(ex.response);
        }
    }
}

export async function postApiData(endpoint, data){
    if (token){
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };
        const res = await axios.post(endpoint, data);
        return res;
    } 
}
export default{
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}