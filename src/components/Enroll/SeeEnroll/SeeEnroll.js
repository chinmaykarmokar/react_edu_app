// Import Modules:

import React, { Component } from 'react';
import Home from '../../HomeUI/Home';
import Profile from '../../HomeUI/Profile';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './SeeEnroll.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar';
import Chart from "react-google-charts";
import ListGroup from 'react-bootstrap/ListGroup'
import Stepper from 'react-stepper-horizontal';
import { BsFillPersonFill } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import personImg from '../../../assets/bg2.jpg';

class SeeEnroll extends Component{

    state = {
        loading: true,
        teacherName: 'acv',
        total: 3,
        pageNo: 1,
        previous: '',
        next: '',
        enrollData: [],
        chartData: {},
        activeStepData: [],
        steps: [
            // {
            //     title: 'A',
            // }, 
            // {
            //     title: 'B',
            // }
        ],
        currentStep: 0,
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

    handleChangePage = (No) => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            
            let pageNo = parseInt(No);
            console.log(pageNo);
            this.setState({pageNo: pageNo});
            this.getRoomsEnroll(pageNo);
            
            let activeStepData = '';
            this.createChart();
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

    handleNextStep = () => {
        // alert(this.state.currentStep)
        if(this.state.currentStep < Object.keys(this.state.chartData).length - 1){
            this.state.currentStep = this.state.currentStep + 1;
            this.setState({activeStepData: this.state.chartData[this.state.currentStep]});
        }
        else{
            this.notify('error', 'You cannot go further');
        }
    }

    handlePreviousStep = () => {
        // alert(this.state.currentStep)
        if(this.state.currentStep > 0){
            this.state.currentStep = this.state.currentStep - 1;
            this.setState({activeStepData: this.state.chartData[this.state.currentStep]});
        }
        else{
            this.notify('error', 'You cannot go back');
        }
    }

    getRoomsEnroll = (pageNo) => {
        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
		const tokenData = this.parseJwt(token);
		// alert(JSON.stringify(tokenData));

        const teacherId = this.state.teacherId;
        const baseUrl = 'http://localhost:5000/edu/v1/rooms/get-room-enroll?room_id=all' 
        const param1 = '&teacher_id='+ teacherId
        const param2 = '&pageno=' + pageNo
        const param3 = '&groupby_aggregate=yes'
        const url = baseUrl + param1 + param2 + param3

		axios.get(url, {headers: headers})
		.then(response =>{
			console.log([response['data']["rooms_enrollment"]["total"]]);

			if(response['status'] == 200) {
                this.setState({total: response['data']["rooms_enrollment"]["total"]});
                this.setState({pageNo: response['data']["rooms_enrollment"]["pageno"]});
                this.setState({previous: response['data']["rooms_enrollment"]["previous"]});
                this.setState({next: response['data']["rooms_enrollment"]["next"]});
                this.setState({enrollData: response['data']["rooms_enrollment"]["data"]});

                console.log(this.state.enrollData);
			}
		})
		.catch(error => {
			console.log(error.response);
		});
    }

    createChart = () => {
        const chartSteps = []
        const chartData = {}

        for(let i=0; i < this.state.enrollData.length; i++){
            // alert(JSON.stringify(this.state.enrollData[i]));
            chartSteps.push(
                {
                    'title': ''
                }
            );
            chartData[i] = this.state.enrollData[i]['student_names']
        }

        this.setState({steps: chartSteps});
        this.setState({chartData: chartData});
        this.setState({activeStepData: this.state.chartData[this.state.currentStep]});
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false});
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token);
            // alert(JSON.stringify(tokenData));
            const user_id = tokenData['_id'];
            const user_name = tokenData['username'];
            this.setState({teacherId: user_id});
            this.setState({teacherName: user_name});

			this.getRoomsEnroll(1);
          }, 1000);
          
        setTimeout(() => {
            this.createChart()}
        , 2500);
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
                            <Col md={12}>
                                <br/>
                                <Card className="Card">
                                    <Card.Body>
                                        <br/>
                                        <div align="center">
                                            <h3>Room's Enrollment's List:</h3>
                                            <hr className = "Line"/>
                                        </div>
                                        <Row>
                                            <Col md={1}></Col>
                                            <Col md={2} align="center" onClick={this.handlePreviousStep} style={{color: "navy", fontSize:"50px"}}>
                                                <Card className="Card21">
                                                    <Card.Body>
                                                        <FaAngleLeft/>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={6}>
                                                <Card className="Card2">
                                                    <Card.Body>
                                                        <Stepper 
                                                            steps={ this.state.steps } 
                                                            activeStep={ this.state.currentStep } 
                                                            disabledSteps={ [2] }
                                                        />
                                                        <br/>
                                                        <Card.Img variant="top" src={personImg} height="150" />
                                                        <br/><br/>
                                                        <Card.Title>{this.state.teacherName}</Card.Title>

                                                        <ListGroup defaultActiveKey="#link">
                                                        {
                                                            Object.keys(
                                                                this.state.activeStepData
                                                            ).map((row) => (
                                                                <ListGroup.Item action href="#">
                                                                <BsFillPersonFill className = "d-inline float"/>
                                                                &nbsp;
                                                                {this.state.activeStepData[row]}
                                                                </ListGroup.Item>
                                                            ))
                                                        }
                                                        </ListGroup>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={2} align="center" onClick={this.handleNextStep} style={{color: "navy", fontSize:"50px"}}>
                                                <Card className="Card21">
                                                    <Card.Body>
                                                        <FaAngleRight/>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={1}></Col>
                                        </Row>
                                        <br/>
                                        <div>
                                            <ButtonGroup aria-label="Basic example">
                                                <Button variant="success" onClick={this.handlePrevious}>Previous</Button>
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
            }
            </div>
        )
    }
}

export default SeeEnroll;