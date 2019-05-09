import { ADD_MEMBER, LOAD_MEMBERS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return [...state, action.payload];
    case LOAD_MEMBERS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
