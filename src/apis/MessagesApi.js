import axios from 'axios'
export default class GroupsApi {
    fetch(type = 'group', id){
        const res = axios.get(`messages/${id}/${type}`);
        return res;
    }

    send(type = 'group', id, message){
        const response = axios.post(`messages/${id}/${type}`,message)
        return response;
    }
}
