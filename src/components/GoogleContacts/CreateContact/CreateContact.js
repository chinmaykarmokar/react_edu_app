// Import Modules:

import React, { Component } from 'react';
import Home from '../../HomeUI/Home';
import Profile from '../../HomeUI/Profile';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stepper from 'react-stepper-horizontal';
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import './CreateContact.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar'
import { FaGooglePlusG, FaGooglePlus } from "react-icons/fa";

class CreateContact extends Component{

    state = {
        loading: true,
    }

    parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    notify = (notify_type, notify_msg) => {
        if(notify_type == 'error'){
            toast.error(notify_msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        if(notify_type == 'success'){
            toast.success(notify_msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    onCreateContact = () => {
        // Push Data to API and create new Test:

        const token = window.sessionStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        const postData = JSON.stringify({
            "teacher_id": "s"
        })
        this.notify('success', 'Contact created on Google +');
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
            this.setState({showHome:true})
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token)
            const user_id = tokenData['_id']
            this.setState({teacherId:user_id})

			// this.getAccountData();
		  }, 1000);
    }
    
    render(){
        return(
            <div>
                {
                    this.state.loading? <Spinner/>:
                    <div>
                        <Navibar/>
                        <Container>
                            <Row>
                                <Col md={3}></Col>
                                <Col md={6} style = {{}}>
                                    <Card className="TestDetails">
                                        <Card.Body>
                                            <br/>
                                            {/* <br/> */}
                                            <div align="center">
                                                <h3>Create New Contact</h3>
                                                {/* <FaGooglePlusG style = {{color: "navy", fontSize:"50px"}} className = "d-inline block"/> */}
                                                <hr className = "Line"/>
                                            </div>
                                            <br/>
                                            <Form style = {{textAlign: "left", padding: "10px"}}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label >Teacher Id</Form.Label>
                                                    <Form.Control
                                                        type="text" 
                                                        placeholder="Enter Teacher Id" 
                                                        className = "Field" 
                                                        value={this.state.teacherId} 
                                                        onChange={(event) => this.setState({teacherId: event.target.value})}  
                                                    />
                                                </Form.Group>
                                            </Form>
                                            <br/>
                                            <br/>
                                            <div className="BtnAlign">
                                            <Button 
                                                className = "SubmitData1" 
                                                onClick = {this.onCreateContact}
                                            >
                                                Create G+ Contact
                                            </Button>
                                            </div>
                                            <br/>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}></Col>
                            </Row>
                        </Container>
                    </div>
                }
            </div>
        )
    }
}

export default CreateContact;