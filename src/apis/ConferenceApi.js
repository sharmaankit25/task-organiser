import axios from 'axios'
export default class ConferenceApi {
    async connect(id, room_id, type = 'group'){
        const res = await axios.get(`conference/${id}/${room_id}/${type}`);
        return res;
    }

    async disconnect(id, room_id, type = 'group'){
        const res = await axios.get(`conference/${id}/${room_id}/${type}/disconnect`);
        return res;
    }

    send(type = 'group', id, message){
        const response = axios.post(`messages/${id}/${type}`,message)
        return response;
    }
}
