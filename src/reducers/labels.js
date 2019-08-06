import { ADD_LABEL } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_LABEL:
      return [...state, action.payload];
    // case LOADING_MEMBERS:
    //   return state;
    // case LOAD_MEMBERS:
    //   return [...state, ...action.payload];
    default:
      return state;
  }
};
