import { ADD_LABEL,LOAD_LABELS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_LABEL:
      return [...state, action.payload];
    case LOAD_LABELS:
      return [...action.payload];
    default:
      return state;
  }
};
