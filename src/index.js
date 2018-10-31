import React from 'react';
import ReactDOM from 'react-dom';

import  "babel-polyfill"
import App from './App';

import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


import Home from './contains/Home/Home'
import Article from './contains/Article/Article'
import MessageBroad from "./contains/MessageBroad/MessageBroad";
import Lab from "./contains/Lab/Lab"
import WeekShare from "./contains/WeekShare/WeekShare"
import NotFound from "./contains/NotFound";
import ArticleContent from "./contains/ArticleContent/ArticleContent";
import WeekShareContent from "./contains/WeekShareContent/WeekShareContent"


import store from './store'
import {Provider} from 'react-redux'




ReactDOM.render(

<Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/article/:id' component={ArticleContent}/>
                    <Route path='/article' component={Article}/>
                    <Route path='/messagebroad' component={MessageBroad}/>
                    <Route path='/weekshare/:id' component={WeekShareContent}/>
                    <Route path='/weekshare' component={WeekShare}/>
                    <Route path='/lab' component={Lab}/>
                    <Route component={NotFound}/>
                </Switch>
            </App>
        </Router>
</Provider>
   , document.getElementById('root'));
registerServiceWorker();

