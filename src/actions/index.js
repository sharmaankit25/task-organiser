import {
  ADD_TASK,
  LOAD_TASKS,
  TOGGLE_TASK_STATUS,
  FILTER_TASKS,
  LOGIN,
  LOGOUT,
  AUTH_ERROR,
  ADD_GROUP,
  ADD_MEMBER,
  LOAD_GROUPS,
  LOAD_MEMBERS
} from "./types";

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
        dueDate: "2019-05-10",
        repeat: "once",
        title: "Fetched async from server",
        isCompleted: false
      }
    ]
  };
};

export const filterTasks = () => {
  return {
    type: FILTER_TASKS,
    payload: { dueDate: new Date() }
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

export function login({ email, password }) {
  const token = "343h4vb23jh4v23j4v";
  localStorage.setItem("token", token);
  return { type: LOGIN };
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

export const createGroup = group => {
  return {
    type: ADD_GROUP,
    payload: group
  };
};

export const loadGroups = () => {
  return {
    type: LOAD_GROUPS,
    payload: [
      {
        title: "family",
        description: "my family group"
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
        name: "ankit"
      },
      {
        name: "sarthak"
      }
    ]
  };
};
