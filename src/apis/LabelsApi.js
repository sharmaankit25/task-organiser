import axios from 'axios'

export default class LabelsApi {
    getAll(group_id){
        const res = axios.get(`groups/${group_id}/labels`);
        return res;
    }

    getOne(task){

    }

    create(group_id,{title,description,color}){        
        const response = axios.post(`/groups/${group_id}/labels`,{
            "title":title,
            "description":description,
            "color":color,
        })
        return response;
    }

    update(task){
       
    }
}