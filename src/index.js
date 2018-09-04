import React from 'react';
import ReactDOM from 'react-dom';

import  "babel-polyfill"
import App from './App';

import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


import Home from './contains/Home/Home'
import Article from './contains/Article/Article'

import BackStage from './contains/BackStage/BackStage'
import MessageBroad from "./contains/MessageBroad/MessageBroad";
import AdminLogin from "./contains/BackStage/AdminLogin";
import NotFound from "./contains/NotFound";


ReactDOM.render(

        <Router>
            <App>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/article' component={Article}/>
                    <Route path='/messagebroad' component={MessageBroad}/>
                    <Route path='/backstage' component={BackStage}/>
                    <Route path='/adminlogin' component={AdminLogin}/>
                    <Route component={NotFound}/>
                </Switch>
            </App>
        </Router>
   , document.getElementById('root'));
registerServiceWorker();

