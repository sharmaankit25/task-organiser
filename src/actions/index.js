import {
  ADD_TASK,
  LOAD_TASKS,
  TOGGLE_TASK_STATUS,
  LOGIN,
  LOGOUT,
  AUTH_ERROR,
  ADD_GROUP,
  ADD_MEMBER,
  LOADING_GROUPS,
  LOAD_GROUPS,
  LOAD_MEMBERS,
  LOADING_MEMBERS,
  UPDATE_GROUP,
  LOGGING,
  AUTH_USER
} from "./types";

import Auth from '../apis/Auth'
import GroupsApi from '../apis/GroupsApi'
import TasksApi from '../apis/TasksApi'
import MembersApi from '../apis/MembersApi'
// Create a new Task
export const addTask = task => async dispatch => {
  try{
    const {data} = await new TasksApi().create(task)
    dispatch({
      type: ADD_TASK,
      payload: data.data
    })
  }catch(err){
    console.log(err)
  }
};

// Load Tasks async
export const loadTasks = () => async dispatch => {
  try{
    const {data} = await new TasksApi().getAll()
    dispatch({
      type: LOAD_TASKS,
      payload: data.data
    })
  }catch(err){
    console.log(err);
  }
};

export const toggleTaskStatus = task => async dispatch =>{
  try{
    const {data} = await new TasksApi().toggleStatus(task)
    dispatch({
      type: TOGGLE_TASK_STATUS,
      payload: data.data
    })
  }catch(err){
    console.log(err);
  }
};

export function logout() {
  localStorage.removeItem("token");
  return {
    type: LOGOUT
  };
}

export const login = ({ email, password }) => async dispatch =>{
    try {
      const {data} = await new Auth().login({username:email,password});
      const token = `${data.token_type} ${data.access_token}`
      localStorage.setItem("token", token);
      new Auth().set_token();
      dispatch(loggedIn());
    }catch(err){
      dispatch(authError(err.response.data.message));
    }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function loggingIn() {
  return {
    type: LOGGING
  };
}

export const loggedIn = () => dispatch => {
  dispatch(authUser());
  dispatch({
    type: LOGIN
  });
  dispatch(loadGroups());
  dispatch(loadTasks());
}

export const authUser = () =>async dispatch => {
  try{
    const user = await new Auth().user();
    dispatch({
      type:AUTH_USER,
      payload:user.data
    });
  }catch(err){
    console.log(err);
  }
}

export const createGroup = group => async dispatch => {
  try{
    const {data} = await new GroupsApi().create(group);
    dispatch({
      type: ADD_GROUP,
      payload: data.data
    });
  }catch(err){
    console.log(err);
  }
};

export const updateGroup = group => async dispatch =>{
  try{
    const {data} = await new GroupsApi().update(group);
    dispatch({
      type: UPDATE_GROUP,
      payload: data.data
    });
  }catch(err){
    console.log(err);
  }
};

export const loadGroups = () => async dispatch => {
  dispatch({type:LOADING_GROUPS});
  try{
    const groups = await new GroupsApi().fetchAll();
    dispatch({
      type: LOAD_GROUPS,
      payload:groups.data.data
    });
    dispatch(loadMembers());
  }catch(err){
    console.log(err.response);
  }
};

export const addMember = member => async dispatch => {
  try{
    await new MembersApi().follow(member);
    dispatch({
      type: ADD_MEMBER,
      payload: member
    })
  }catch(err){
    console.log(err);
  }
  
};

export const searchMember = async query => {
  return await new MembersApi().search(query);
};

export const loadMembers = () => async dispatch => {
  dispatch({
    type: LOADING_MEMBERS,
  });
  try{
    const {data} = await new Auth().user_contacts();
    dispatch({
      type: LOAD_MEMBERS,
      payload:data.data
    });
  }catch(err){
    console.log(err.response); 
  }
};
