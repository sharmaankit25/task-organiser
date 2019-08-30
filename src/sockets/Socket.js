import Echo from "laravel-echo"
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
    }
}