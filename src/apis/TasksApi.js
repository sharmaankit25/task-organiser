import axios from 'axios'

export default class TasksApi {
    getAllTasks(){
        const res = axios.get('tasks');
        return res;
    }
}