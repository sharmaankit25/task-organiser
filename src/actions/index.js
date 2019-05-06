import {
  ADD_TASK,
  LOAD_TASKS,
  TOGGLE_TASK_STATUS
} from "./types"

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
    payload: {assignee: "ankit",dueDate: "",repeat: "once",title: "Fetched async from server",isCompleted:false}
  };
};

export const toggleTaskStatus = task => {
  return {
    type:TOGGLE_TASK_STATUS,
    payload:task
  }
}