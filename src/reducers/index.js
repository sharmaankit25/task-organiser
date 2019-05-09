import { combineReducers } from "redux";
import tasks from "./tasks";
import auth from "./auth";
import groups from "./groups";
import members from "./members";

const rootReducer = combineReducers({
  tasks,
  auth,
  groups,
  members
});

export default rootReducer;
