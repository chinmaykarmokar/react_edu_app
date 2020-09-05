import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
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
import RoomMenu from './components/Room/RoomMenu/RoomMenu'
import SeeRoom from './components/Room/SeeRoom/SeeRoom'
import SingleRoom from './components/Room/SeeRoom/SingleRoom/SingleRoom'
import CreateRoom from './components/Room/CreateRoom/CreateRoom'
import UpdateRoom from './components/Room/UpdateRoom/UpdateRoom'
import DeleteRoom from './components/Room/DeleteRoom/DeleteRoom'
import SeeContact from './components/GoogleContacts/SeeContact/SeeContact'
import ContactMenu from './components/GoogleContacts/ContactMenu/ContactMenu'
import CreateContact from './components/GoogleContacts/CreateContact/CreateContact'
import EventCal from './components/EventCal/EventCal'
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure()

am4core.useTheme(am4themes_animated);


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
                        <Route path = "/event-list" component = {EventCal}></Route>
                        <Route path = "/room-menu" component = {RoomMenu}></Route>
                        <Route path = "/room-create" component = {CreateRoom}></Route>
                        <Route path = "/room-list" component = {SeeRoom}></Route>
                        <Route path = "/room-get" component = {SingleRoom}></Route>
                        <Route path = "/room-mod" component = {UpdateRoom}></Route>
                        <Route path = "/room-del" component = {DeleteRoom}></Route>
                        <Route path = "/contact-menu" component = {ContactMenu}></Route>
                        <Route path = "/contact-create" component = {CreateContact}></Route>
                    </Switch>
                </div>
            </HashRouter> 
        )
    }
}

export default App;
