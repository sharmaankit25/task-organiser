import { combineReducers } from "redux";
import tasks from "./tasks";
import auth from "./auth";
import groups from "./groups";
import members from "./members";
import labels from "./labels";
import {LOGOUT} from "../actions/types"
const appReducer = combineReducers({
  tasks,
  auth,
  groups,
  members,
  labels
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
