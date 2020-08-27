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
import './UpdateRoom.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';

// Component Definitions:

class UpdateRoom extends Component{
	state = {
		loading: true,
		roomName: '',
		showRoomSelector: true,
		showRoomInfo: false,
		teacher_id: '',
		limit: '',
		agenda: '',
		room_name: '',
		room_id: '',
		created: '',
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

	getSingleRoom = (room_id) => {
        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
        const tokenData = this.parseJwt(token);
        // const urlParams = this.getUrlParams();
        const teacher_id = tokenData["_id"];
		const url = 'http://localhost:5000/edu/v1/rooms/get-room?teacher_id='+teacher_id+'&room_id='+room_id

        axios.get(url, {headers: headers})
		.then(response =>{
			if(response['status'] == 200) {
				this.setState({teacher_id: response['data']['rooms_data']['teacher_id']});
				this.setState({limit: response['data']['rooms_data']['limit']});
				this.setState({agenda: response['data']['rooms_data']['agenda']});
				this.setState({room_name: response['data']['rooms_data']['room_name']});
				this.setState({room_id: response['data']['rooms_data']['room_id']});
				this.setState({created: response['data']['rooms_data']['created']});
			}
		})
		.catch(error => {
			console.log(error.response);

			// if(error.response['status'] == 401) {
			// 	window.alert('Failed Login');
			// }
		});
	}

	onSelectRoom = () => {
		this.setState({showRoomSelector: false});
		setTimeout(() => {
			const room_id = this.state.room_id;
			this.setState({showRoomInfo: true});
			this.getSingleRoom(room_id)
		}, 1000);
	}

	onUpdateRoom = () => {
		this.setState({showRoomInfo: false});

        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
        const tokenData = this.parseJwt(token);
        // const urlParams = this.getUrlParams();
        const teacher_id = tokenData["_id"];

		const room_id = this.state.room_id;
		const url = 'http://localhost:5000/edu/v1/rooms/mod-room?roomid='+room_id+'&teacherid='+teacher_id

		const postData = JSON.stringify({
		    "limit": parseInt(this.state.limit),
		    "agenda": this.state.agenda,
		    "room_name": this.state.room_name
		})
		console.log(postData);

		axios.put(url, postData, {headers: headers})
		.then(response => {
		    console.log(response);

		    this.notify('success', 'Test updated successfully');
		})
		.catch(error => {
		    console.log(error.response);
		    // alert(JSON.stringify(error.response));

		    // this.notify('error', 'Failed to update Test');
		    if(error.response.status == 400) {
		        this.notify('error', error.response.data.message);
		    }
		    if(error.response.status == 500) {
		        this.notify('error', 'Internal Server Error');
		    }
		});

		setTimeout(() => {
		    this.setState({showRoomSelector: true});
		    window.location.reload();
		}, 3000);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
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
	    		    		    <h3 align="center">Select Room to update</h3>
	    		    		    <hr className = "Line"/>
	    		    		</div>
	    		    		<br/>
	    		    		{
	    		    			this.state.showRoomSelector?
		    		    		<Card className="TestDetails">
		    		    			<Card.Body>
							    		<Form style = {{textAlign: "left", padding: "10px"}}>
							    			<Form.Group controlId="formBasicEmail">
							    			    <Form.Label >Room Id</Form.Label>
							    			    <Form.Control
							    			        type="text" 
							    			        placeholder="Enter Room Id" 
							    			        className = "Field" 
							    			        value={this.state.room_id} 
							    			        onChange={(event) => this.setState({room_id: event.target.value})}  
							    			    />
							    			</Form.Group>
							    		</Form>
				    					<br/>
				    		    		{/*<br/>*/}
				    		    		<div className="BtnAlign">
				    		    		<Button 
				    		    		    className = "SubmitData1" 
				    		    		    onClick = {this.onSelectRoom}
				    		    		>
				    		    		    Select Room
				    		    		</Button>
				    		    		</div>
				    		    		<br/>
							    	</Card.Body>
							    </Card>
							    : null
							}
							{
	    		    			this.state.showRoomInfo?
		    		    		<Card className="TestDetails">
		    		    			<Card.Body>
							    		<Form style = {{textAlign: "left", padding: "10px"}}>
						    		        <Form.Group controlId="formBasicEmail">
						    		            <Form.Label >Teacher Id</Form.Label>
						    		            <Form.Control
						    		                type="text" 
						    		                placeholder="Enter Teacher Id" 
						    		                className = "Field" 
						    		                value={this.state.teacher_id} 
						    		                readOnly
						    		                onChange={(event) => this.setState({teacher_id: event.target.value})}  
						    		            />
						    		        </Form.Group>
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
						    		        <Form.Group controlId="formBasicEmail">
						    		            <Form.Label >Room Name</Form.Label>
						    		            <Form.Control
						    		                type="text" 
						    		                placeholder="Enter Room Name" 
						    		                className = "Field" 
						    		                value={this.state.room_name} 
						    		                onChange={(event) => this.setState({room_name: event.target.value})}  
						    		            />
						    		        </Form.Group>
							    		</Form>
				    					<br/>
				    		    		<div className="BtnAlign">
				    		    		<Button 
				    		    		    className = "SubmitData1" 
				    		    		    onClick = {this.onUpdateRoom}
				    		    		>
				    		    		    Update Room
				    		    		</Button>
				    		    		</div>
				    		    		<br/>
							    	</Card.Body>
							    </Card>
							    : null
							}
						</Col>
						<Col md={3}></Col>
					</Row>
				</Container>
			}
			</div>
		)
	}
}

export default UpdateRoom;