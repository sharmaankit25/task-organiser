import axios from 'axios'
import {API_BASE_URL} from '../config/app'
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

if(localStorage.token){
    axios.defaults.headers.common['Authorization'] = localStorage.token;
}

axios.interceptors.request.use(config => {
    config.headers.common['Content-Type'] = 'application/json';
    config.headers.common['Accept'] = 'application/json';

    return config;
  });

axios.interceptors.response.use((response) => {
    return response;
},async (error) => {
    if (401 === error.response.status) {
        await Toast.show({
            text: 'Unauthorized Access'
        });
        return Promise.reject(error);
    }

    if (error.response.status === 500) {
        await Toast.show({
            text: 'Oops! Something went wrong on server'
        });
    }

    return Promise.reject(error);
});
