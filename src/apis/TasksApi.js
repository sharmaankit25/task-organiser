import axios from 'axios'

export default class TasksApi {
    getAll(){
        const res = axios.get('tasks');
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
   
    update(id,{isCompleted,label_id}){        
        const response = axios.patch(`/tasks/${id}`,{
            isCompleted,label_id
        })
        return response;
    }
}