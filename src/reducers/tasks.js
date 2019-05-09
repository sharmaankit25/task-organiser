import { ADD_TASK, LOAD_TASKS, TOGGLE_TASK_STATUS } from "../actions/types";

const tasks = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case LOAD_TASKS:
      return [...state, ...action.payload];
    case TOGGLE_TASK_STATUS:
      return state.map(task =>
        task.title === action.payload.title
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );
    default:
      return state;
  }
};

export default tasks;
