import axios from 'axios'
import {PASSPORT_CLIENT_ID,PASSPORT_CLIENT_SECRET} from "../config/app"

export default class Auth {

    login({username,password}){
        const response = axios.post('/oauth/token',{
            "grant_type":"password",
            "client_id":PASSPORT_CLIENT_ID,
            "client_secret":PASSPORT_CLIENT_SECRET,
            "username":username,
            "password":password,
            "scope":"*"
        })
        return response;
    }

    set_token(){
        if(localStorage.token){
           axios.defaults.headers.common['Authorization'] = localStorage.token;
        }
    }

    user(){
        const res = axios.get('/user');
        return res;
    }

    user_contacts(){
        const res = axios.get('/user/contacts');
        return res;
    }

    async refresh_token(){

    }

    async logout(){

    }
}