import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/HomeUI/Home';
import HomeUI from './components/HomeUI/HomeUI';
import './App.css';

class App extends Component{
    render(){
        return(
          <HomeUI/>
        )
    }
}

export default App;
