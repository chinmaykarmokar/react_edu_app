// Import Modules:

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stepper from 'react-stepper-horizontal';
import Accordion from 'react-bootstrap/Accordion'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import './CreateTest.css'
import axios from 'axios';
import { toast } from 'react-toastify';

// Component Definition:

class CreateTest extends Component{

	state = {
        details: "",
        customerId: "",
        noMandatoryQuestions: 0,
        noQuestions: [],
        schedule: "",
        startTime: "",
        endTime: "",
        qna: [],
        qna_dictionary: {},
        duration: 0,
        showTestDetails: false,
        showTestQuestions: false,
        steps: [
            {
                title: '',
            }, 
            {
                title: '',
            }
        ],
        currentStep: 0,
        showDoneButton: false,
        gilad: true,
        jason: false,
        antoine: false,
    }
    
    onClickPrevious = () => {
        const { steps, currentStep } = this.state;
        this.state.currentStep = this.state.currentStep - 1;
        if (this.state.currentStep == 0) {
            this.setState({showTestQuestions:false});
            this.setState({showTestDetails:true});
            this.setState({showDoneButton:false});
        }
        else{
            if(this.state.currentStep < 0){
                window.alert('Please click on Next');
                this.state.currentStep = 0;
            }
        }
    }

    onClickNext = () => {
        const { steps, currentStep } = this.state;
        this.state.currentStep = this.state.currentStep + 1;
        if (this.state.currentStep == 1) {
            this.setState({showTestQuestions:true});
            this.setState({showTestDetails:false});
            this.setState({showDoneButton:true});
            this.state.noQuestions = Array.from(
                {length: this.state.noMandatoryQuestions}, (x, i) => i
            );
            // alert(JSON.stringify(this.state.noQuestions));
        }
        else{
            if(this.state.currentStep > 1){
                window.alert('Please click on submit');
                this.state.currentStep = 1;
            }
        }
    }

    selectAnswer = (answer_id, answer_index) => {
        // window.alert(answer_id)
        let r = answer_id[1]
        this.state.qna_dictionary['Q'+r] = {}
        this.state.qna_dictionary['Q'+r].options = []

        for(let i=1; i<5; i++){
            let id = `A${r}${i}`

            if(id == answer_id){
                document.getElementById(id).style.backgroundColor = '#00cccc';
                document.getElementById(id).style.color = '#000000';

                // Push Question and Corresponding Answer to qna_dictionary:

                this.state.qna_dictionary['Q'+r].question = document.getElementById('Q'+r).innerHTML
                this.state.qna_dictionary['Q'+r].answer = document.getElementById(id).innerHTML
                this.state.qna_dictionary['Q'+r].options.push(document.getElementById(id).innerHTML);
            }
            else{
                document.getElementById(id).style.backgroundColor = '#ffffff';
                this.state.qna_dictionary['Q'+r].options.push(document.getElementById(id).innerHTML);
            }
        }
        console.log(this.state.qna_dictionary);
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

    onSubmitAnswer = () => {
        Object.keys(this.state.qna_dictionary).map((question_key) => (
            this.state.qna.push(
                {
                    question: this.state.qna_dictionary[question_key].question,
                    options: this.state.qna_dictionary[question_key].options,
                    answer: this.state.qna_dictionary[question_key].answer,
                }
            )
        ))
        console.log(this.state.qna);

        // Push Data to API and create new Test:

        const token = window.sessionStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        const postData = JSON.stringify({
            "details": this.state.details,
            "customerid": this.state.customerId,
            "no_mandatory_questions": parseInt(this.state.noMandatoryQuestions),
            "schedule": this.state.schedule,
            "start_time": this.state.startTime,
            "end_time": this.state.endTime,
            "qna": this.state.qna,
            "duration": parseFloat(this.state.duration)
        })

        console.log(postData);

        const url = 'http://localhost:5000/edu/v1/tests/create-test'
        axios.post(url, postData, {headers: headers})
        .then(response => {
            console.log(response);

            this.notify('success', 'Test created successfully');
            window.location.reload();
        })
        .catch(error => {
            console.log(error.response);

            this.notify('error', 'Failed to create Test');
            // if(error.response['status'] == 401) {
            //     window.alert('Failed Login');
            // }
        });

    }

    handleTestDetails = () => {
		if (this.state.showTestQuestions) {
			this.setState({showTestQuestions:false});
		}
		this.setState({showTestDetails:true})
	}

	handleTestQuestions = () => {
		if (this.state.showTestDetails) {
			this.setState({showTestDetails:false});
		}
		this.setState({showTestQuestions:true})
    }

    parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    
    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        const tokenData = this.parseJwt(token)
        const user_id = tokenData['_id']
		this.setState({showTestDetails:true})
        this.state.customerId = user_id
	}

    render(){
        return(
            <div className = "ParentDiv">
                <Container fluid="md">
                    <Row>
                    <Col md = {12}>
                        <div className = "CardLayout">
                            <Stepper 
                                steps={ this.state.steps } 
                                activeStep={ this.state.currentStep } 
                                disabledSteps={ [2] }
                            />
                            {
                                this.state.showTestDetails ?
                                <div>
                                    <div>
                                        <h3>Enter Test Data</h3>
                                        <hr className = "Line"/>
                                    </div>
                                    <Form style = {{textAlign: "left", padding: "10px"}}>
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Details</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    placeholder="Enter Details" 
                                                    className = "Field" 
                                                    value={this.state.details} 
                                                    onChange={(event) => this.setState({details: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Customer Id</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    placeholder="Enter Customer Id" 
                                                    className = "Field" 
                                                    value={this.state.customerId} 
                                                    onChange={(event) => this.setState({customerId: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >No of Mandatory Questions</Form.Label>
                                                <Form.Control
                                                    type="number" 
                                                    min="1"
                                                    max="10"
                                                    placeholder="Enter No of Mandatory Questions" 
                                                    className = "Field" 
                                                    value={this.state.noMandatoryQuestions} 
                                                    onChange={(event) => this.setState({noMandatoryQuestions: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Schedule</Form.Label>
                                                <Form.Control
                                                    type="datetime-local" 
                                                    placeholder="Enter Test Schedule" 
                                                    className = "Field" 
                                                    value={this.state.schedule} 
                                                    onChange={(event) => this.setState({schedule: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Start Time</Form.Label>
                                                <Form.Control
                                                    type="datetime-local" 
                                                    placeholder="Enter Test Start Time" 
                                                    className = "Field" 
                                                    value={this.state.startTime} 
                                                    onChange={(event) => this.setState({startTime: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >End Time</Form.Label>
                                                <Form.Control
                                                    type="datetime-local" 
                                                    placeholder="Enter Test End Time" 
                                                    className = "Field" 
                                                    value={this.state.endTime} 
                                                    onChange={(event) => this.setState({endTime: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Duration</Form.Label>
                                                <Form.Control
                                                    type="number" 
                                                    step=".1"
                                                    placeholder="Enter Test Duration" 
                                                    className = "Field" 
                                                    value={this.state.duration} 
                                                    onChange={(event) => this.setState({duration: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                    </Form>
                                </div>
                                : null
                            }
                            {
                                this.state.showTestQuestions ?
                                <div>
                                    <div>
                                        <h3>Enter Questions Data</h3>
                                        <h4>Click to Select Correct Answer</h4>
                                        <hr className = "Line"/>
                                    </div>
                                    <br/>
                                    <Accordion>
                                    {
                                        this.state.noQuestions.map((row, index) => (
                                        <Card className="TestDetails">
                                            <Accordion.Toggle as={Card.Header} eventKey={index+1}>
                                                Question {index+1}:
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={index+1}>
<Card.Body>
    <Card.Text contentEditable id={'Q'+(index+1)}>Enter Question</Card.Text>
    <ListGroup variant="flush">
        <ListGroup.Item contentEditable onClick={() => this.selectAnswer('A'+(index+1)+1, 1)} id={'A'+(index+1)+1}>Answer 1</ListGroup.Item>
        <ListGroup.Item contentEditable onClick={() => this.selectAnswer('A'+(index+1)+2, 2)} id={'A'+(index+1)+2}>Answer 2</ListGroup.Item>
        <ListGroup.Item contentEditable onClick={() => this.selectAnswer('A'+(index+1)+3, 3)} id={'A'+(index+1)+3}>Answer 3</ListGroup.Item>
        <ListGroup.Item contentEditable onClick={() => this.selectAnswer('A'+(index+1)+4, 4)} id={'A'+(index+1)+4}>Answer 4</ListGroup.Item>
    </ListGroup>
</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        ))
                                    }
                                    </Accordion>
                                    <br/>
                                </div>
                                : null
                            }
                            <div className = "BtnAlign">
                                <ButtonGroup variant="contained" color="green" aria-label="contained green button group">
                                    <Button 
                                        className = "SubmitData1" 
                                        onClick = {this.onClickPrevious}
                                    >
                                        Previous
                                    </Button>
                                    <Button 
                                        className = "SubmitData1" 
                                        onClick = {this.onClickNext}
                                    >
                                        Next
                                    </Button>
                                    {
                                        this.state.showDoneButton ?
                                            <Button 
                                                className = "SubmitData1" 
                                                onClick = {this.onSubmitAnswer}
                                            >
                                                Submit
                                            </Button>
                                        : null
                                    }
                                </ButtonGroup>
                            </div>
                            <br/>
                        </div>
                    </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default CreateTest;