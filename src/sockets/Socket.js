import Echo from "laravel-echo"
import axios from 'axios'
import "pusher-js"
import {PUSHER_KEY,SERVER_HOST_NAME} from '../config/app'

const echo = new Echo({
  broadcaster: 'pusher',
  key: PUSHER_KEY,
  wsHost: SERVER_HOST_NAME,
  wsPort: 6001,
  wssPort: 6001,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  encrypted: process.env.NODE_ENV !== 'development',
  forceTLS: process.env.NODE_ENV !== 'development',
  authEndpoint: process.env.NODE_ENV === 'development' ? `http://${SERVER_HOST_NAME}/broadcasting/auth` : `https://${SERVER_HOST_NAME}/broadcasting/auth`,
  auth: {
  headers: {
    Authorization:localStorage.token,
    Accept: 'application/json'
    }
  }
});

echo.connector.pusher.connection.bind('connected', (res)=>{
  axios.defaults.headers['X-Socket-ID'] = res.socket_id
})

echo.connector.pusher.connection.bind( 'error', function( err ) {
  if( err.error.data.code === 4004 ) {
  console.log('>>> detected limit error');
  }
});

Object.freeze(echo)
export default echo
