import axios from 'axios'
export default class GroupsApi {
    fetchAll(){
        const res = axios.get('groups');
        return res;
    }

    create(group){
        const response = axios.post('groups',group)
        return response;
    }

    update(group){
        const response = axios.put(`groups/${group.id}`,group)
        return response;
    }
}
