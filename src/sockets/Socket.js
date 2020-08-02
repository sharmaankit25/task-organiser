import Echo from "laravel-echo"
import axios from 'axios'
import "pusher-js"
import {PUSHER_KEY,SERVER_HOST_NAME} from '../config/app'

export default class Socket {
    constructor(){
        this.echo = new Echo({
            broadcaster: 'pusher',
            key: PUSHER_KEY,
            wsHost: SERVER_HOST_NAME,
            wsPort: 6001,
            disableStats: true,
            authEndpoint: `http://${SERVER_HOST_NAME}/broadcasting/auth`,
            auth: {
            headers: {
              Authorization:localStorage.token,
              Accept: 'application/json'
              }
            }
          });

      //
      this.echo.connector.pusher.connection.bind('connected', (res)=>{
        axios.defaults.headers['X-Socket-ID'] = res.socket_id
      })

      this.echo.connector.pusher.connection.bind( 'error', function( err ) {
        if( err.error.data.code === 4004 ) {
        console.log('>>> detected limit error');
        }
      });
    }
}
