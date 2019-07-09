import React,{useEffect} from 'react';
import './bootstrap/app';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar"
import routes from "./routes";
import store from "./store";
import { loadGroups, loadMembers, loadTasks,loggedIn } from "./actions/index";
if(localStorage.token){
  store.dispatch(loggedIn());
}
function App() {
  useEffect(()=>{
    async function fetchData() {
      // You can await here
      await store.dispatch(loadGroups());
      await store.dispatch(loadMembers());
      await store.dispatch(loadTasks());
      // ...
    }
    fetchData();

  },[]);

  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        {routes.map(route=><Route key={route.path} {...route} />)}
      </Router>
    </Provider>
  );
}

export default App;
