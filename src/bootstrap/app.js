import axios from 'axios'
import Echo from "laravel-echo"
import {API_BASE_URL,PUSHER_KEY} from '../config/app'


axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

if(localStorage.token){
    axios.defaults.headers.common['Authorization'] = localStorage.token;
}

const client = require('pusher-js');
const options = {
    broadcaster: 'pusher',
    key: PUSHER_KEY,
    cluster:'mt1',
    forceTLS: false,
    wsHost:"api.taskorganiser-dev.com",
    wsPort:6001,
    client: client,
    auth: {
      headers: {
        Authorization: localStorage.token,
        Accept: 'application/json',
      },
    },
  };
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'your-pusher-channels-key',
    cluster: 'eu',
    forceTLS: true
});
  const echo = new Echo(options);

    echo.private(`home`).listen((data) => {
        console.log(data);
    });
