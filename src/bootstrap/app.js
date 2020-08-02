import axios from 'axios'
import {API_BASE_URL} from '../config/app'
import Auth from '../apis/Auth';

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
        console.log("expired Refresh token");
        await new Auth().refresh_token();
        return Promise.resolve();
    }

    // if (error.response.status === 500) {
    //     await new Auth().logout();
    //     window.location.refresh()
    //     return Promise.reject(error);
    // }
});
