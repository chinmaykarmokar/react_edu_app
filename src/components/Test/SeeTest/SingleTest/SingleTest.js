// Import Modules:

import React, { Component } from 'react';
// import './Register.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
import Spinner from '../../../Spinner/Spinner';
import { BsCloudDownload } from "react-icons/bs";
import { toast } from 'react-toastify';
import './SingleTest.css'
import Navibar from '../../../Navibar/Navibar'
import { FaCalendarAlt, FaGooglePlus, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
// import { BiDetail } from "react-icons/bi";

// Component Definition:

class SingleTest extends Component{

    state = {
        details: "",
        schedule: "",
        duration: 0,
        start_time: "",
        end_time: "",
        no_mandatory_questions: 0,
        test_id: "",
        qna: [],
        loading: true,
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
			// console.log([response['data']["test_data"]["total"]]);

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
			}
		})
		.catch(error => {
			console.log(error.response);

			// if(error.response['status'] == 401) {
			// 	window.alert('Failed Login');
			// }
		});
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

    downloadTestData = () => {
        this.notify('success', 'Downloading Pdf...!');
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({loading: false});
            this.getSingleTestData();
          }, 1000);
    }
    
    render(){
        return(
            this.state.loading ? <Spinner/> :
            <div>
                <Navibar/>
                <Container fluid>
                    <Card className="TestDetails">
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>
                                {/* <Card className="TestDetails">
                                    <Card.Body>Test Details:</Card.Body>
                                </Card> */}
                                <h4>Test Details:</h4>
                                <br></br>
                                <hr className="LoginLine"/>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                        <br></br>
                    
                        <Row>
                            <Col md={1}></Col>
                            <Col md={5}>
                                <Card className="TestDetails">
                                    <Card.Body>
                                        <AiOutlineNumber/>
                                        Test Id: {this.state.test_id}
                                    </Card.Body>
                                    <Card.Body>
                                        {/* <BiDetail/> */}
                                        Details: {this.state.details}
                                    </Card.Body>
                                    <Card.Body>
                                        
                                        Schedule: {this.state.schedule}
                                    </Card.Body>
                                    <Card.Body>
                                        
                                        Duration: {this.state.duration}
                                    </Card.Body>
                                    <Card.Body>
                                        
                                        Start Time: {this.state.start_time}
                                    </Card.Body>
                                    <Card.Body>
                                        
                                        End Time: {this.state.end_time}
                                    </Card.Body>
                                    <Card.Body>
                                        
                                        No of Mandatory Questions: {this.state.no_mandatory_questions}</Card.Body>
                                    {/* <Card.Body>qna: response['data']['test_data']['qna']</Card.Body> */}
                                </Card>
                            </Col>
                            <Col md={5}>
                                <Card className="TestDetails">
                                    <Card.Body>Click to see individual question details</Card.Body>
                                </Card>    
                                <Accordion>
                                    {this.state.qna.map((row, index) => (
                                    <Card className="TestDetails">
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
                                                <Card.Text>Answer: {row.answer}</Card.Text>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>)
                                    )}
                                </Accordion>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10} style={{"textAlign": "center"}}>
                                <Button variant="success" onClick={this.downloadTestData}>
                                    <BsCloudDownload style={{"padding": "5px", "fontSize": "30px"}}/>
                                    Download Test Data
                                </Button>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                        <br/>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default SingleTest;