import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import './App.css';
import TopBlock from './component/TopBlock.js';
import MyTasks from './component/MyTask.js';
import InProcess from './component/InProcess.js';
import Completed from './component/Completed.js';
import { LoginPage } from "./component/login.js";

const App=()=>{
  return (
    <ReactRouterDOM.HashRouter>
      <TopBlock />
      <ReactRouterDOM.Switch>
        <ReactRouterDOM.Route exact path="/" component={()=><MyTasks/>} />
        <ReactRouterDOM.Route exact path="/inProcess" component={()=><InProcess/>} />
        <ReactRouterDOM.Route exact path="/completed" component={()=><Completed/>} />
        <ReactRouterDOM.Route exact path="/login" component={()=><LoginPage />} />
      </ReactRouterDOM.Switch>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;
