
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => console.log("Store", store.getState()));
// store.dispatch(addCharacterById(2));
export default store;