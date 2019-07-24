import axios from 'axios'
import Echo from "laravel-echo"
import "pusher-js"
import {API_BASE_URL,PUSHER_KEY,SERVER_HOST_NAME} from '../config/app'

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

if(localStorage.token){
    axios.defaults.headers.common['Authorization'] = localStorage.token;
}

const echo = new Echo({
  broadcaster: 'pusher',
  key: PUSHER_KEY,
  wsHost: SERVER_HOST_NAME,
  wsPort: 6001,
  disableStats: true,
});

echo.channel('home')
.listen("NewMessage", (e) => {
    console.log(e);
});