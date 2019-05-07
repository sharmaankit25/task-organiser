import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar"
import routes from "./routes";
import store from "./store";
import {login} from "./actions/index"

function App() {
  if(localStorage.token){
    // Set auth token in axios
    store.dispatch(login({email:"ankit@acadbee.com",password:"abc"}));
  }
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
