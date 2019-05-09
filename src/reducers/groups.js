import { ADD_GROUP, LOAD_GROUPS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_GROUP:
      return [...state, action.payload];
    case LOAD_GROUPS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
