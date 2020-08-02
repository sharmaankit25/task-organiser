import axios from 'axios'
export default class ConferenceApi {
    async fetch(id, room_id, type = 'group'){
        const res = await axios.get(`conference/${id}/${room_id}/${type}`);
        return res;
    }

    send(type = 'group', id, message){
        const response = axios.post(`messages/${id}/${type}`,message)
        return response;
    }
}
