// Import Modules:

import React, { Component } from 'react';
// import Home from '../../HomeUI/Home';
// import Profile from '../../HomeUI/Profile';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stepper from 'react-stepper-horizontal';
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import './SingleRoom.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../../Spinner/Spinner';
import { FaQrcode } from "react-icons/fa";
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Navibar from '../../../Navibar/Navibar'

class SingleRoom extends Component{
	state = {
		loading: true,
		show: false,
	}

	parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

	getUrlParams = () => {
        const vars = {};
        const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
        function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    showQRCode = () => {
    	this.setState({show: true});
    }

    handleClose = () => {
    	this.setState({show: false});
    }

    goToRoom = () => {
		const token = window.sessionStorage.getItem('token');
		const tokenData = this.parseJwt(token);
        const urlParams = this.getUrlParams();
        const roomName = urlParams["room_name"];
        const teacherId = urlParams["teacher_id"];
		const url = 'http://localhost:3000/#/roomui-get?room_name='+roomName+'&teacher_id='+teacherId;
		// window.open(url, '_blank');
		window.location.href = url;
    }

	getSingleRoom = () => {
        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
        const tokenData = this.parseJwt(token);
        const urlParams = this.getUrlParams();
        const roomId = urlParams["room_id"];
        const teacherId = urlParams["teacher_id"];
		const url = 'http://localhost:5000/edu/v1/rooms/get-room?teacher_id='+teacherId+'&room_id='+roomId

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

	componentDidMount(){
		setTimeout(() => {
			this.setState({loading: false})
		}, 1000);
		this.getSingleRoom();
	}

	render(){
		return(
			<div>
			{
				this.state.loading ? <Spinner/>:
				<div>
					<Navibar/>
					<Container fluid>
						
						<br/>
						<Card className="RoomDetails">
							<Row>
							    <Col md={1}></Col>
							    <Col md={10} align="center">
							        <h4>Room Details:</h4>
							        <br></br>
							        <hr className="LoginLine"/>
							    </Col>
							    <Col md={1}></Col>
							</Row>
							{/*<br/>*/}
							<Row>
								<Col md={4}></Col>
								<Col md={4}>
									<br/>
									<Card className="RoomDetails">
										<Card.Img 
											variant="top" 
											src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
											style={{'height': '30vh'}}
										/>
										<Card.Body>
											<Card.Text>Room Name: {this.state.room_name}</Card.Text>
											<Card.Text>Room Agenda: {this.state.agenda}</Card.Text>
											<Card.Text>Room Id: {this.state.room_id}</Card.Text>
											<Card.Text>Teacher Id: {this.state.teacher_id}</Card.Text>
											<Card.Text>Room Limit: {this.state.limit}</Card.Text>
											<Card.Text>Room Creation: {this.state.created}</Card.Text>
										</Card.Body>
									</Card>
									<br/>
									<Button variant="primary" onClick={this.showQRCode}>
									    <FaQrcode style={{"padding": "5px", "fontSize": "30px"}}/>
									    Show QR Code
									</Button>
									&nbsp;
									&nbsp;
									<Button variant="primary" onClick={this.goToRoom}>
									    {/*<FaQrcode style={{"padding": "5px", "fontSize": "30px"}}/>*/}
									    Go to Room
									</Button>
									<br/>
								</Col>
								<Col md={4}></Col>
							</Row>
							<br/>
						</Card>
						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Scan the QR Code to Join Room</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/WM2007_QRCode.svg/768px-WM2007_QRCode.svg.png" fluid />
							</Modal.Body>
						</Modal>
					</Container>
				</div>
			}
			</div>
		)
	}
}

export default SingleRoom;