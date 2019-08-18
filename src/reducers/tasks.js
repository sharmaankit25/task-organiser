import { ADD_TASK, LOAD_TASKS, UPDATE_TASK } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case LOAD_TASKS:
      return [...state, ...action.payload];
    case UPDATE_TASK:
      return state.map(task =>
        task.title === action.payload.title
          ? { ...action.payload }
          : task
      );
    default:
      return state;
  }
};
