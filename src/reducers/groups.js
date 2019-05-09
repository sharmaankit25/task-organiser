import { ADD_GROUP, LOAD_GROUPS } from "../actions/types";

const groups = (state = [], action) => {
  switch (action.type) {
    case ADD_GROUP:
      return [...state, action.payload];
    case LOAD_GROUPS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default groups;
