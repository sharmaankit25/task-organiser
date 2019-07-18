import axios from 'axios'

export default class MembersApi {
    
    search(query){
        const res = axios.get(`/user/search?q=${query}`)
        return res;
    }

    follow({id}){
        return axios.get(`/user/follow/${id}`);
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