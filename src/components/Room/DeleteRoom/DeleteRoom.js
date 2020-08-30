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
import './DeleteRoom.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar'
import Table from 'react-bootstrap/Table'

class DeleteRoom extends Component{

    state = {
        loading: true,
        total: 0,
        pageNo: 1,
        previous: 0,
        next: 0,
        roomData: [],
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
        
        if(notify_type == 'info'){
	        toast.info(notify_msg, {
	            position: toast.POSITION.TOP_RIGHT
	        });
        }

	    if(notify_type == 'success'){
	        toast.success(notify_msg, {
	            position: toast.POSITION.TOP_RIGHT
	        });
	    }
    }
    
    getRoomsData = (pageNo) => {
        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
		const tokenData = this.parseJwt(token);
        // alert(JSON.stringify(tokenData));
        const teacherId = tokenData['_id']

		const url = 'http://localhost:5000/edu/v1/rooms/get-room?room_id=all&teacher_id='+teacherId+'&pageno='+pageNo
        console.log(url)

		axios.get(url, {headers: headers})
		.then(response =>{
			console.log([response['data']["rooms_data"]["data"]]);

			if(response['status'] == 200) {
                this.setState({total: response['data']["rooms_data"]["total"]});
                this.setState({pageNo: response['data']["rooms_data"]["pageno"]});
                this.setState({previous: response['data']["rooms_data"]["previous"]});
                this.setState({next: response['data']["rooms_data"]["next"]});
                this.setState({roomData: response['data']["rooms_data"]["data"]});

                // alert(JSON.stringify(this.state.roomData));
			}
		})
		.catch(error => {
			console.log(error.response);

			// if(error.response['status'] == 401) {
			// 	window.alert('Failed Login');
			// }
		});
    }

    handleChangePage = (No) => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            
            let pageNo = parseInt(No);
            console.log(pageNo);
            this.setState({pageNo: pageNo});
            this.getRoomsData(pageNo);
          }, 1000);
    }

    handleNext = () => {
        const page = this.state.page;
        if(page <= this.state.total){
            this.handleChangePage(page+1);
        }
        else{
            // alert('Limit Exceeded')
            this.notify('error', 'You"re on last page');
        }
    }

    handlePrevious = () => {
        const page = this.state.page;
        if(page > 0){
            this.handleChangePage(page-1);
        }
        else{
            // alert('Limit Receeded')
            this.notify('error', 'You"re on first page');
        }
    }

    getPages = () => {
        const pagesButtons = []
        console.log(this.state.total)
        for(let i=1; i<=this.state.total; i++) {
            pagesButtons.push(
                <Button variant="primary" onClick={() => this.handleChangePage(i)}>
                    {i}
                </Button>
            )
        }
        return pagesButtons
    }

    deleteRoom = (roomId) => {
        const url = 'http://localhost:5000/edu/v1/rooms/del-room?room_id=' + roomId;
		const token = window.sessionStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        this.notify('info', 'Deleting Room');
        
        setTimeout(
            axios.delete(url, {headers: headers})
            .then(response => {
                console.log(response);

                this.notify('success', 'Room deleted successfully');
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response);

                this.notify('error', 'Failed to delete Room');
                // if(error.response['status'] == 401) {
                //     window.alert('Failed Login');
                // }
            })
        , 1000)
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({loading: false});
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token)
            const user_id = tokenData['_id']
            this.setState({teacherId:user_id})

            this.getRoomsData(1);
        }, 1000);
    }

    render(){
        return(
            this.state.loading? <Spinner/>:
            <div>
                <Navibar/>
                <Container>
                    <Row>
                        <Col md={12}>
                            <br/>
                            <Card className="Card">
                                <Card.Body>
                                    <br/>
                                    <div align="center">
                                        <h3 align="center">Select Room to delete</h3>
                                        <hr className = "Line"/>
                                    </div>
                                    <br/>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th align="right">Room Id</th>
                                                <th align="right">Room Name</th>
                                                <th align="right">Limit</th>
                                                <th align="right">Agenda</th>
                                                <th align="right">Created</th>
                                                <th align="right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            Object.keys(this.state.roomData).map((row, index) => (
                                            <tr>    
                                                <td>
                                                    <a href={"/#/room-get?testid="+this.state.roomData[row]['room_id']}>
                                                        {this.state.roomData[row]['room_id']}
                                                    </a>
                                                </td>
                                                <td>{this.state.roomData[row]['room_name']}</td>
                                                <td>{this.state.roomData[row]['limit']}</td>
                                                <td>{this.state.roomData[row]['agenda']}</td>
                                                <td>{this.state.roomData[row]['created']}</td>
                                                <td>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => this.deleteRoom(this.state.roomData[row]['room_id'])}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                    <br/>
                                    <div>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="success"onClick={this.handlePrevious}>Previous</Button>
                                            {
                                                this.getPages()
                                            }
                                            <Button variant="success" onClick={this.handleNext}>Next</Button>
                                        </ButtonGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DeleteRoom;