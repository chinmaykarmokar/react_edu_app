// Import Modules:

import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FaCalendarAlt, FaGooglePlus, FaRegTrashAlt } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar'
import Accordion from 'react-bootstrap/Accordion'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import axios from 'axios';
import './CreateTestAttempt.css';

// Component Definition:

class CreateTestAttempt extends Component{

    state = {
        loading: true,
        details: '',
        schedule: '',
        duration: '',
        start_time: '',
        end_time: '',
        no_mandatory_questions: 0,
        test_id: '',
        qna: [],
        totalq: 0,
        attemptedq: 0,
        remainingq: 0,
        qna_map: {},
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

    getUrlParams = () => {
        const vars = {};
        const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
        function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    getSingleTestData = () => {
        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
        const tokenData = this.parseJwt(token);
        const urlParams = this.getUrlParams();
        const testid = urlParams["testid"];

        // alert(queryString);
        // alert(urlParams);

        const url = 'http://localhost:5000/edu/v1/tests/get-test?testid=' + testid

        axios.get(url, {headers: headers})
		.then(response =>{
			console.log([response['data']["test_data"]["qna"]]);

			if(response['status'] == 200) {
                // this.setState({userName: response['data']['users']['name']});
                this.setState({details: response['data']['test_data']['details']});
                this.setState({schedule: response['data']['test_data']['schedule']});
                this.setState({duration: response['data']['test_data']['duration']});
                this.setState({start_time: response['data']['test_data']['start_time']});
                this.setState({end_time: response['data']['test_data']['end_time']});
                this.setState({no_mandatory_questions: response['data']['test_data']['no_mandatory_questions']});
                this.setState({test_id: response['data']['test_data']['test_id']});
                this.setState({qna: response['data']['test_data']['qna']});
                this.setState({totalq: this.state.qna.length});
			}
		})
		.catch(error => {
			console.log(error.response);

			// if(error.response['status'] == 401) {
			// 	window.alert('Failed Login');
			// }
		});
    }
      
    initializeClock = (id, endtime) => {
        const clock = document.getElementById(id);

        console.log(clock);
        const daysSpan = document.getElementById('days');
        const hoursSpan = document.getElementById('hours');
        const minutesSpan = document.getElementById('minutes');
        const secondsSpan = document.getElementById('seconds');

        console.log(daysSpan);
        console.log(hoursSpan);
        console.log(minutesSpan);
        console.log(secondsSpan);

        function getTimeRemaining(endtime) {
            const total = Date.parse(endtime) - Date.parse(new Date());
            const seconds = Math.floor((total / 1000) % 60);
            const minutes = Math.floor((total / 1000 / 60) % 60);
            const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            const days = Math.floor(total / (1000 * 60 * 60 * 24));
            
            return {
                total,
                days,
                hours,
                minutes,
                seconds
            };
        }
      
        function updateClock() {
            const t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
      
        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
    }

    onSelectAnswer = () => {
        
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
            this.setState({showHome:true})
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token)
            const user_id = tokenData['_id']
            this.setState({teacherId:user_id})
            this.getSingleTestData();
            const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
            this.initializeClock('clockdiv1', deadline);
		  }, 1000);
    }

    render(){
        return(
        <div>
            {
            this.state.loading? <Spinner/>:
            <div>
                <Navibar/>
                <br/>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card className="Card">
                                <br/>
                                <div align="center">
                                    <h3>Attempt Test:</h3>
                                    <hr className = "Line"/>
                                </div>
                                <Card.Body>
                                    <Row>
                                        <Col md={1}></Col>
                                        <Col md={2}>
                                            <Card>
                                                <Card.Header>Time Remaining:</Card.Header>
                                                <Card.Body>
                                                    <ButtonToolbar id="clockdiv1" aria-label="Toolbar with button groups">
                                                        <ButtonGroup className="mr-2" aria-label="First group">
                                                            <Button id="days">s</Button>
                                                            <Button id="hours"></Button>
                                                            <Button id="minutes"></Button>
                                                            <Button id="seconds"></Button>
                                                        </ButtonGroup>
                                                    </ButtonToolbar>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card>
                                                <Card.Header>Test Stats:</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>Total: {this.state.totalq}</Card.Text>
                                                    <Card.Text>Attempted: {this.state.attemptedq}</Card.Text>
                                                    <Card.Text>Remaining: {this.state.remainingq}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={8}>
                                            <Card>
                                                <Card.Header>Test Questions:</Card.Header>
                                                <Accordion>
                                                {
                                                    this.state.qna.map((row, index) => (
                                                        // <Card className="TestDetails">
                                                        <div>
                                                            <Accordion.Toggle as={Card.Header} eventKey={index+1}>
                                                                Question {index+1}:
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey={index+1}>
                                                                <Card.Body>
                                                                    {/* {JSON.stringify(row)} */}
                                                                    <Card.Text>Question Id: {row._id}</Card.Text>
                                                                    <Card.Text>Question: {row.question}</Card.Text>
                                                                    <Card.Text>Option 1: {row.option1}</Card.Text>
                                                                    <Card.Text>Option 2: {row.option2}</Card.Text>
                                                                    <Card.Text>Option 3: {row.option3}</Card.Text>
                                                                    <Card.Text>Option 4: {row.option4}</Card.Text>
                                                                    {/* <Card.Text>Answer: {row.answer}</Card.Text> */}
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        {/* </Card> */}
                                                        </div>
                                                    ))
                                                }
                                                </Accordion>
                                            </Card>
                                        </Col>
                                        <Col md={1}></Col>
                                    </Row>
                                    <br/>
                                    <br/>
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

export default CreateTestAttempt;