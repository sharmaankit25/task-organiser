import axios from 'axios'
import {API_BASE_URL} from '../config/app'

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

if(localStorage.token){
    axios.defaults.headers.common['Authorization'] = localStorage.token;
}

axios.interceptors.response.use((response) => {
    return response;
},(error) => {
    console.log("Error is ",error);
    if (401 === error.response.status) {
        console.log("expired ");
    } else {
        return Promise.reject(error);
    }
});
