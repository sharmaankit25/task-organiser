import axios from 'axios'

export default class MembersApi {
    
    async search(query){
        try{
            const {data} = await axios.get(`/user/search?q=${query}`)
            return data;
        }catch(err){
            return err;
        }
    }

    follow({id}){
        return axios.get(`/user/follow/${id}`);
    }

    invitations(){
        return axios.get(`user/invitations`);
    }

    acceptInvite(id){
        return axios.get(`user/follow/${id}/accept`);
    }

    rejectInvite(id){
        return axios.get(`user/follow/${id}/reject`);
    }
    
    getAll(){
        const res = axios.get('members');
        return res;
    }

    getOne(task){

    }

    create({groupSlug,title,dueDate,repeat,assignee}){
        const response = axios.post('/tasks',{
            "groupSlug":groupSlug,
            "title":title,
            "due_date":dueDate,
            "type":repeat,
            "is_completed":false,
            "assignee":assignee
        })
        return response;
    }

    update(task){
       
    }

    toggleStatus({id}){
        const response = axios.patch(`/tasks/${id}`)
        return response;
    }
}