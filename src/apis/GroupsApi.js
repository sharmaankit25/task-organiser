import axios from 'axios'

export const fetchAll = () =>{
    const res = axios.get('groups');
    // console.log(res.data);
    return res;
}