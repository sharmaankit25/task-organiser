import {
  ADD_TASK,
  LOAD_TASKS,
  TOGGLE_TASK_STATUS,
  LOGIN,
  LOGOUT,
  AUTH_ERROR,
  ADD_GROUP,
  ADD_MEMBER,
  LOAD_GROUPS,
  LOAD_MEMBERS,
  UPDATE_GROUP,
  LOGGING,
  AUTH_USER
} from "./types";

import Auth from '../apis/Auth'
// Create a new Task
export const addTask = task => {
  return {
    type: ADD_TASK,
    payload: task
  };
};

// Load Tasks async
export const loadTasks = () => {
  return {
    type: LOAD_TASKS,
    payload: [
      {
        assignee: "ankit",
        dueDate: "2019-05-17",
        repeat: "once",
        title: "Fetched async from server",
        isCompleted: false,
        groupSlug: "office"
      },
      {
        assignee: "ankit",
        dueDate: "2019-05-16",
        repeat: "once",
        title: "Go out on a holiday",
        isCompleted: false,
        groupSlug: "family"
      }
    ]
  };
};

export const toggleTaskStatus = task => {
  return {
    type: TOGGLE_TASK_STATUS,
    payload: task
  };
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
      dispatch(loggedIn());
    }catch(err){
      dispatch(authError(err.response.data.message));
    }
}


export function setAuthorizationToken(token) {
  if (token) {
    // localStorage.setItem("token", token);
    // Settings in axios as well
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

export const loggedIn = () => async dispatch => {
  await dispatch(authUser());
  dispatch({
    type: LOGIN
  });
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

export const createGroup = group => {
  return {
    type: ADD_GROUP,
    payload: { ...group, slug: group.title }
  };
};

export const updateGroup = group => {
  return {
    type: UPDATE_GROUP,
    payload: { ...group, slug: group.title }
  };
};

export const loadGroups = () => {
  return {
    type: LOAD_GROUPS,
    payload: [
      {
        title: "family",
        description: "my family group",
        slug: "family",
        members:[1,2]
      },
      {
        title: "office",
        description: "my family group",
        slug: "office",
        members:[2]
      }
    ]
  };
};

export const addMember = member => {
  return {
    type: ADD_MEMBER,
    payload: member
  };
};

export const loadMembers = () => {
  return {
    type: LOAD_MEMBERS,
    payload: [
      {
        id:1,
        name: "ankit"
      },
      {
        id:2,
        name: "sarthak"
      }
    ]
  };
};
