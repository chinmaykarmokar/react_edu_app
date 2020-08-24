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
import './CreateRoom.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';

class CreateRoom extends Component{

    state = {
        loading: true,
        teacherId: "",
        limit: 10,
        agenda: "",
        roomName: ""
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

    onCreateRoom = () => {
        // Push Data to API and create new Test:

        const token = window.sessionStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        const postData = JSON.stringify({
            "teacher_id": this.state.teacherId,
            "limit": this.state.limit,
            "agenda": this.state.agenda,
            "room_name": this.state.roomName
        })

        console.log(postData);

        const url = 'http://localhost:5000/edu/v1/rooms/create-room'
        axios.post(url, postData, {headers: headers})
        .then(response => {
            console.log(response);

            this.notify('success', 'Test created successfully');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
        .catch(error => {
            console.log(error.response);
            // alert(JSON.stringify(error.response));

            // this.notify('error', 'Failed to create Test');
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

			// this.getAccountData();
		  }, 1000);
	}

    render(){
        return(
            <div>
                {
                    this.state.loading? <Spinner/>:
                    <Container>
                        <Row>
					    	<Col md={3}></Col>
					    	<Col md={6} style = {{}}>
					    		<br/>
		    		    		<br/>
		    		    		<div>
		    		    		    <h3 align="center">Create New Room</h3>
		    		    		    <hr className = "Line"/>
		    		    		</div>
		    		    		<br/>
		    		    		<Card className="TestDetails">
		    		    			<Card.Body>
							    		<Form style = {{textAlign: "left", padding: "10px"}}>
							    		    <div>
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
							    		    </div>
                                            <div>
							    		        <Form.Group controlId="formBasicEmail">
							    		            <Form.Label >Room Limit</Form.Label>
							    		            <Form.Control
							    		                type="number" 
							    		                // placeholder="Enter Room Limit" 
                                                        className = "Field"
                                                        min = "10"
                                                        max = "100" 
							    		                value={this.state.limit} 
							    		                onChange={(event) => this.setState({limit: event.target.value})}  
							    		            />
							    		        </Form.Group>
							    		    </div>
                                            <div>
							    		        <Form.Group controlId="formBasicEmail">
							    		            <Form.Label >Room Agenda</Form.Label>
							    		            <Form.Control
							    		                type="text" 
							    		                placeholder="Enter Room Agenda" 
							    		                className = "Field" 
							    		                value={this.state.agenda} 
							    		                onChange={(event) => this.setState({agenda: event.target.value})}  
							    		            />
							    		        </Form.Group>
							    		    </div>
                                            <div>
							    		        <Form.Group controlId="formBasicEmail">
							    		            <Form.Label >Room Name</Form.Label>
							    		            <Form.Control
							    		                type="text" 
							    		                placeholder="Enter Room Name" 
							    		                className = "Field" 
							    		                value={this.state.roomName} 
							    		                onChange={(event) => this.setState({roomName: event.target.value})}  
							    		            />
							    		        </Form.Group>
							    		    </div>
							    		</Form>
				    					<br/>
				    		    		<br/>
				    		    		<div className="BtnAlign">
				    		    		<Button 
				    		    		    className = "SubmitData1" 
				    		    		    onClick = {this.onCreateRoom}
				    		    		>
				    		    		    Create Room
				    		    		</Button>
				    		    		</div>
				    		    		<br/>
							    	</Card.Body>
					    		</Card>
					    	</Col>
					    	<Col md={3}></Col>
					    </Row>
                    </Container>
                }
            </div>
        )
    }
}

export default CreateRoom;