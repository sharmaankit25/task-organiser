import {
  ADD_TASK,
  LOAD_TASKS,
  UPDATE_TASK,
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
  AUTH_USER,
  ADD_LABEL,
  LOAD_LABELS,
  LOAD_MESSAGES,
  ADD_MESSAGE
} from "./types";

import Auth from '../apis/Auth'
import GroupsApi from '../apis/GroupsApi'
import LabelsApi from '../apis/LabelsApi'
import TasksApi from '../apis/TasksApi'
import MembersApi from '../apis/MembersApi'
import MessagesApi from '../apis/MessagesApi'
import TaskSocket from "../sockets/TaskSocket"
import MessageSocket from "../sockets/MessageSocket"

// Create a new Task
export const addTask = task => async dispatch => {
  try{
    const {data} = await new TasksApi().create(task)
    dispatch(addTaskToReducer(data.data))
  }catch(err){
    console.log(err)
  }
};

export const loadMessages = (type = 'group',id) => async dispatch => {
  await new MessageSocket().groupMessageReceived(id).listen("NewMessageEvent", (e) => {
    dispatch({
      type: ADD_MESSAGE,
      payload: e.message
    })
  });
  try{
    const {data} = await new MessagesApi().fetch(type, id)
    dispatch({
      type: LOAD_MESSAGES,
      payload: data
    })
  }catch(err){
    console.log(err);
  }
  return {}
}

export const sendMessages = (type = 'group',id, message)  => async dispatch => {
  try{
    const { data } =await new MessagesApi().send(type, id, { message })
    dispatch({
      type: ADD_MESSAGE,
      payload: data
    })
  }catch(err){
    console.log(err);
  }
  return {}
}

export const addTaskToReducer = (task) => {
  return {
    type: ADD_TASK,
    payload: task
  }
}

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

export const updateTask = (id,task) => async dispatch =>{
  try{
    const {data} = await new TasksApi().update(id,task)
    dispatch(updateTaskInReducer(data.data))
  }catch(err){
    console.log(err);
  }
};

export const updateTaskInReducer = (task) => {
  return {
    type: UPDATE_TASK,
    payload: task
  }
}


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
      localStorage.setItem("refreshToken", data.refresh_token);
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

    await new TaskSocket().taskCreated(user.data.id).listen("TaskCreatedEvent", (e) => {
      dispatch(addTaskToReducer(e.task));
    });

    await new TaskSocket().taskUpdated(user.data.id).listen("TaskUpdatedEvent", (e) => {
      dispatch(updateTaskInReducer(e.task))
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

export const loadInvitations = async () =>{
  return new MembersApi().invitations();
}

export const acceptInvite = async (id) =>{
  return new MembersApi().acceptInvite(id);
}

export const rejectInvite = async (id) =>{
  return new MembersApi().rejectInvite(id);
}

export const createLabel = (group_id,label) => async dispatch => {
  try{
    const {data} = await new LabelsApi().create(group_id,label);
    dispatch({
      type:ADD_LABEL,
      payload:data
    });
  }catch(err){
    console.log(err.response);
  }
}

export const loadLabels = group_id => async dispatch => {
  try{
    const labels = await new LabelsApi().getAll(group_id);
    dispatch({
      type: LOAD_LABELS,
      payload:labels.data
    });
  }catch(err){
    console.log(err.response);
  }
}
