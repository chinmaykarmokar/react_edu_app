import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/HomeUI/Home';
import HomeUI from './components/HomeUI/HomeUI';
import TestMenu from './components/Test/TestMenu/TestMenu'
import SeeTest from './components/Test/SeeTest/SeeTest'
import CreateTest from './components/Test/CreateTest/CreateTest'
import UpdateTest from './components/Test/UpdateTest/UpdateTest'
import DeleteTest from './components/Test/DeleteTest/DeleteTest'
import SingleTest from './components/Test/SeeTest/SingleTest/SingleTest'
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure()

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
                        <Route path = "/test-menu" component = {TestMenu}></Route>
                        <Route path = "/test-list" component = {SeeTest}></Route>
                        <Route path = "/test-get" component = {SingleTest}></Route>
                        <Route path = "/test-create" component = {CreateTest}></Route>
                        <Route path = "/test-mod" component = {UpdateTest}></Route>
                        <Route path = "/test-del" component = {DeleteTest}></Route>
                    </Switch>
                </div>
            </HashRouter> 
        )
    }
}

export default App;
