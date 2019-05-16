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
        slug: "family"
      },
      {
        title: "office",
        description: "my family group",
        slug: "office"
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
