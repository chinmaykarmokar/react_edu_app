import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/HomeUI/Home';
import HomeUI from './components/HomeUI/HomeUI';
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';

class App extends Component{
    render(){
        return(
            <HashRouter>
                <div>
                    <Switch>
                        <Route path = "/" exact component = {Login}>
                            <Login/>
                        </Route>
                        <Route path = "/register" component = {Register}></Route>
                        <Route path = "/home" component = {HomeUI}></Route>
                        <Route path = "/homepage" component = {Home}></Route>
                    </Switch>
                </div>
            </HashRouter> 
        )
    }
}

export default App;
