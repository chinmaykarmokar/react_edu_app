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
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
 
const localizer = momentLocalizer(moment);


// Component Definitions:

class EventCal extends Component {
    state = {
        loading: false,
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

    render(){
        return(
            <div>
            {
                this.state.loading ? <Spinner/> :
                <Container fluid="md">
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
                            <Card className="CardLayout">
				        		<Card.Body>
                                    <Calendar
                                        localizer={localizer}
                                        events={this.state.myEventsList}
                                        startAccessor="start"
                                        endAccessor="end"
                                        style={{ height: 500 }}
                                    />
                                </Card.Body>
				        	</Card>
                        </Col>
                    </Row>
                </Container>
            }
            </div>
        )
    }

}

export default EventCal;