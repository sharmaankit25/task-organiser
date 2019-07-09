import { combineReducers } from "redux";
import tasks from "./tasks";
import auth from "./auth";
import groups from "./groups";
import members from "./members";
import {LOGOUT} from "../actions/types"
const appReducer = combineReducers({
  tasks,
  auth,
  groups,
  members
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
