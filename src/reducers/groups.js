import { ADD_GROUP, UPDATE_GROUP,LOAD_GROUPS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_GROUP:
      return [...state, action.payload];
    case LOAD_GROUPS:
      return [...state, ...action.payload];
    case UPDATE_GROUP:
      const  grps = state.filter(grp=>grp.slug !== action.payload.slug);
      return [...grps,action.payload];
    default:
      return state;
  }
};
