// Import Modules:

import React, { Component } from 'react';
import Home from '../HomeUI/Home';
import Profile from '../HomeUI/Profile';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stepper from 'react-stepper-horizontal';
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import './Settings.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../Navibar/Navibar'

class Settings extends Component{

    state = {
        loading: true,
        theme: 'light',
    }

    parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    changeTheme = () => {
        if (this.state.theme == 'light') {
            this.setState({theme: 'dark'})
        } else {
            this.setState({theme: 'light'})
        }
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token)
            const user_id = tokenData['_id']
            this.setState({teacherId:user_id})

            // this.getRoomsData(1);
			// this.createChart();
          }, 1000);
    }

    render(){
        return(
            <div>
            {
                this.state.loading? <Spinner/>:
                <div>
                    <Navibar/>
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <br/>
                                <Card className="Card">
                                    <Card.Body>
                                        <br/>
                                        <div align="center">
                                            <h3>Settings Menu:</h3>
                                            <hr className = "Line"/>
                                        </div>
                                        <br/>
                                        <Row>
                                            <Col md={1}></Col>
                                            <Col md={5}>
                                                <Card className="Card">
                                                    <Card.Body>
                                                        <Card.Title>Theme:</Card.Title>
                                                        <label class="switch">
                                                            <input type="checkbox" onClick={this.changeTheme}/>
                                                            <span class="slider round"></span>
                                                        </label>
                                                        <Card.Text>
                                                            {this.state.theme}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={5}>
                                                <Card className="Card">
                                                    <Card.Body>
                                                        <Card.Title>Theme:</Card.Title>
                                                        <label class="switch">
                                                            <input type="checkbox" onClick={this.changeTheme}/>
                                                            <span class="slider round"></span>
                                                        </label>
                                                        <Card.Text>
                                                            {this.state.theme}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={1}></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md={1}></Col>
                                            <Col md={5}>
                                                <Card className="Card">
                                                    <Card.Body>
                                                        <Card.Title>Theme:</Card.Title>
                                                        <label class="switch">
                                                            <input type="checkbox" onClick={this.changeTheme}/>
                                                            <span class="slider round"></span>
                                                        </label>
                                                        <Card.Text>
                                                            {this.state.theme}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={5}>
                                                <Card className="Card">
                                                    <Card.Body>
                                                        <Card.Title>Theme:</Card.Title>
                                                        <label class="switch">
                                                            <input type="checkbox" onClick={this.changeTheme}/>
                                                            <span class="slider round"></span>
                                                        </label>
                                                        <Card.Text>
                                                            {this.state.theme}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={1}></Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            }
            </div>
        )
    }
}

export default Settings;