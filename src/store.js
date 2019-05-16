import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { loadGroups, loadMembers, loadTasks } from "./actions/index";

const store = createStore(rootReducer, applyMiddleware(thunk));
// store.subscribe(() => console.log("Store", store.getState()));
store.dispatch(loadGroups());
store.dispatch(loadMembers());
store.dispatch(loadTasks());
export default store;
