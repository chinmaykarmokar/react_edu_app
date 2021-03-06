// Import Modules:

import React, { Component } from 'react';
import axios from 'axios';
import './EventCal.css';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'
import Navibar from '../Navibar/Navibar';
 
const localizer = momentLocalizer(moment);


// Component Definitions:

class EventCal extends Component {
    state = {
        loading: true,
        myEventsList: [
            {
                title: 'New Test',
                start: '2020-08-30',
                end: '2020-08-30',
                allDay: true,
                resource: 'dsx',
            }
        ],
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({loading: false});
          }, 1000);
    }

    render(){
        return(
            <div>
            {
                this.state.loading ? <Spinner/> :
                <div>
                    <Navibar/>
                    <Container fluid="md">
                        <br/>
                        <Row>
                            <Col md={4}></Col>
                            <Col md={4}>
                            <Nav justify variant="Nav" defaultActiveKey="/home">
                                <Nav.Item >
                                    <Nav.Link className="Nav active" eventKey="home" onClick = {this.handleHome}>Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="Nav" eventKey="profile" onClick = {this.handleProfile}>Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="Nav" eventKey="billing">Billing</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col md={4}></Col>
                        </Row>
                        <br/>
                        <Card className="Card">
                            <Card.Body>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={10}>
                                        <h4>Events List:</h4>
                                        <br></br>
                                        <hr className="LoginLine"/>
                                    </Col>
                                    <Col md={1}></Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Calendar
                                            localizer={localizer}
                                            events={this.state.myEventsList}
                                            startAccessor="start"
                                            endAccessor="end"
                                            style={{ height: 500 }}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            }
            </div>
        )
    }

}

export default EventCal;