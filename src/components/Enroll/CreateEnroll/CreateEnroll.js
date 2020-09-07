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
import './CreateEnroll.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar'

// Component Definitions:

class CreateEnroll extends Component{

    state = {
        loading: true,
        teacherId: "",
        studentId: "",
        roomId: ""
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

    onCreateRoomEnroll = () => {
        // Push Data to API and create new Room Enroll:

        const token = window.sessionStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        const postData = JSON.stringify({
            "teacher_id": this.state.teacherId,
            "room_id": this.state.roomId,
            "student_id": this.state.studentId
        })

        console.log(postData);

        const url = 'http://localhost:5000/edu/v1/rooms/create-room-enroll'
        axios.post(url, postData, {headers: headers})
        .then(response => {
            console.log(response);

            this.notify('success', 'Student enrolled into Room successfully');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
        .catch(error => {
            console.log(error.response);
            // alert(JSON.stringify(error.response));

            // this.notify('error', 'Failed to enroll Student into Room');
            if(error.response.status == 400) {
                this.notify('error', error.response.data.message);
            }
            if(error.response.status == 500) {
                this.notify('error', 'Internal Server Error');
            }
        });
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
            this.setState({showHome:true})
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token)
            const user_id = tokenData['_id']
            this.setState({teacherId:user_id})
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
                                        <div>
                                            <h3 align="center">Create New Room Enroll</h3>
                                            <hr className = "Line"/>
                                        </div>
                                        <br/>
                                        
                                        <Form style = {{textAlign: "left", padding: "10px"}}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Room Id</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    placeholder="Enter Room Id" 
                                                    className = "Field" 
                                                    value={this.state.roomId} 
                                                    onChange={(event) => this.setState({roomId: event.target.value})}  
                                                />
                                            </Form.Group>
                                            <br/>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Student Id</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    placeholder="Enter Student Id" 
                                                    className = "Field" 
                                                    value={this.state.studentId} 
                                                    onChange={(event) => this.setState({studentId: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </Form>
                                        <br/>
                                        <div className="BtnAlign">
                                        <Button 
                                            className = "SubmitData1" 
                                            onClick = {this.onCreateRoomEnroll}
                                        >
                                            Create Room Enroll
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

export default CreateEnroll;