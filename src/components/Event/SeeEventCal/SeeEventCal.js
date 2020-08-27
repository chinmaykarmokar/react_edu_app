// Import Modules:

import React, { Component } from 'react';
import axios from 'axios';
import './SeeEventCal.css';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

// Component Definitions:

class SeeEventCal extends Component {
	state = {
		loading: false,
		rowsPerPage: 10,
        page: 1,
        total: 2,
        pageNo: 1,
        previous: null,
        next: null,
        testData: [],
        events: [],
        // {
        //     start: '2015-07-20',
        //     end: '2015-07-02',
        //     eventClasses: 'optionalEvent',
        //     title: 'test event',
        //     description: 'This is a test description of an event',
        // },
        // {
        //     start: '2015-07-19',
        //     end: '2015-07-25',
        //     title: 'test event',
        //     description: 'This is a test description of an event',
        //     data: 'you can add what ever random data you may want to use later',
        // },
        // ],
    }

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

    parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    render(){
        return(
            <div>
            {
                this.state.loading ? <Spinner/>:
                <Container fluid="md">
                    <Row>
                        <Col md={12}>
                            sdsd
                        </Col>
                    </Row>
                </Container>
            }
            </div>
        )
    }
}

export default SeeEventCal;