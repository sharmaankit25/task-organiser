import React,{useEffect} from 'react';
import './bootstrap/app';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar"
import routes from "./routes";
import store from "./store";
import { loggedIn } from "./actions/index";

function App() {
  useEffect(()=>{
    async function fetchData() {
        await store.dispatch(loggedIn());
    }
    if(localStorage.token){
      fetchData();
    }
  },[store]);

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
