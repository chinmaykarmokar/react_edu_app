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
import './UpdateTest.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar'

// Component Definition:

class UpdateTest extends Component{

	state = {
		showTestIdForm: true,
		showTestModForm: false,
		testId: '',
		customerId: '',
		details: "",
		schedule: "",
		duration: 0,
		start_time: "",
		end_time: "",
		no_mandatory_questions: 0,
		test_id: "",
		qna: [],
		update_qna: [],
		qna_dictionary: {},
		loading: false,
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
		showTestDetails: true,
        showTestQuestions: false,
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

	onFetchTest = () => {
		// alert('d');
		this.setState({showTestIdForm: false});
		this.setState({showTestModForm: true});

        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
        const testId = this.state.testId;

        const url = 'http://localhost:5000/edu/v1/tests/get-test?testid=' + testId

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

                this.setState({customerId: this.parseJwt(token)['_id']});
			}
		})
		.catch(error => {
			console.log(error.response);

			// if(error.response['status'] == 401) {
			// 	window.alert('Failed Login');
			// }
		});
	}

	onSubmitAnswer = () => {

        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
        const testId = this.state.test_id;

		const url = 'http://localhost:5000/edu/v1/tests/mod-test?testid=' + testId
		
		Object.keys(this.state.qna_dictionary).map((question_key) => (
            this.state.update_qna.push(
                {
					_id: this.state.qna_dictionary[question_key]._id,
                    question: this.state.qna_dictionary[question_key].question,
                    options: this.state.qna_dictionary[question_key].options,
                    answer: this.state.qna_dictionary[question_key].answer,
                }
            )
        ))
        console.log(this.state.qna);

		const postData = JSON.stringify({
			"start_time":this.state.start_time,
			"end_time": this.state.end_time,
			"details": this.state.details,
			"customerid": this.state.customerId,
			"no_mandatory_questions": parseInt(this.state.no_mandatory_questions),
			"schedule": this.state.schedule,
			"qna": this.state.update_qna,
			"duration": parseFloat(this.state.duration)
		})
		console.log(postData);

        axios.put(url, postData, {headers: headers})
		.then(response =>{
			// console.log([response['data']["test_data"]["total"]]);

			if(response['status'] == 200) {
				this.notify('success', 'Test Updated Successfully');
				this.setState({showTestIdForm: true});
				this.setState({showTestModForm: false});
				this.setState({testId: ''});
			}
		})
		.catch(error => {
			console.log(error.response);
			this.notify('error', error.response.data['message']);

			// if(error.response['status'] == 401) {
			// 	window.alert('Failed Login');
			// }
		});
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

	selectAnswer = (answer_id, question_id, answer_index) => {
		console.log(answer_id);
		console.log(answer_index);
	    let r = answer_id[1]
	    this.state.qna_dictionary[question_id] = {}
	    this.state.qna_dictionary[question_id].options = []

	    for(let i=1; i<5; i++){
	        let id = `A${r}${i}`

	        if(id == answer_id){
	            document.getElementById(id).style.backgroundColor = '#00cccc';
	            document.getElementById(id).style.color = '#000000';

	            // Push Question and Corresponding Answer to qna_dictionary:

				this.state.qna_dictionary[question_id]._id = question_id;
	            this.state.qna_dictionary[question_id].question = document.getElementById(question_id).innerHTML
	            this.state.qna_dictionary[question_id].answer = document.getElementById(id).innerHTML
	            this.state.qna_dictionary[question_id].options.push(document.getElementById(id).innerHTML);
	        }
	        else{
	            document.getElementById(id).style.backgroundColor = '#ffffff';
	            this.state.qna_dictionary[question_id].options.push(document.getElementById(id).innerHTML);
	        }
	    }
	    console.log(this.state.qna_dictionary);
	}

	onModTest = () => {
		// alert('d');
		this.setState({showTestIdForm: true});
		this.setState({showTestModForm: false});
		this.setState({loading: true});
	}

	render(){
		return (
			<div>
				<Navibar/>
				<Container fluid>
				    {
				    	this.state.showTestIdForm?
					    <Row>
					    	<Col md={4}></Col>
					    	<Col md={4} style = {{}}>
					    		<br/>
		    		    		<br/>
		    		    		<Card className="TestDetails">
		    		    			<Card.Body>
									<br/>
									<div>
										<h3 align="center">Modify Existing Test Data</h3>
										<hr className = "Line"/>
		    		    			</div>
		    		    			<br/>
							    		<Form style = {{textAlign: "left", padding: "10px"}}>
							    		    <div>
							    		        <Form.Group controlId="formBasicEmail">
							    		            <Form.Label >Test Id</Form.Label>
							    		            <Form.Control
							    		                type="text" 
							    		                placeholder="Enter Test Id" 
							    		                className = "Field" 
							    		                value={this.state.testId} 
							    		                onChange={(event) => this.setState({testId: event.target.value})}  
							    		            />
							    		        </Form.Group>
							    		    </div>
							    		</Form>
				    					<br/>
				    		    		<br/>
				    		    		<div className="BtnAlign">
				    		    		<Button 
				    		    		    className = "SubmitData1" 
				    		    		    onClick = {this.onFetchTest}
				    		    		>
				    		    		    Fetch Test
				    		    		</Button>
				    		    		</div>
				    		    		<br/>
							    	</Card.Body>
					    		</Card>
					    	</Col>
					    	<Col md={4}></Col>
					    </Row>
					    : null
					}
					{
						this.state.showTestModForm?
						<Row>
					    	<Col md={2}></Col>
					    	<Col md={8}>
					    		<Card className = "CardLayout">
	                            <Stepper 
	                                steps={ this.state.steps } 
	                                activeStep={ this.state.currentStep } 
	                                disabledSteps={ [2] }
	                            />
	                            {
	                                this.state.showTestDetails ?
	                                <div>
	                                    <div align="center">
	                                        <h3>Update Test Data</h3>
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
	                                                    value={this.state.no_mandatory_questions} 
	                                                    onChange={(event) => this.setState({no_mandatory_questions: event.target.value})}  
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
	                                                    value={this.state.start_time} 
	                                                    onChange={(event) => this.setState({start_time: event.target.value})}  
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
	                                                    value={this.state.end_time} 
	                                                    onChange={(event) => this.setState({end_time: event.target.value})}  
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
	                                        this.state.qna.map((row, index) => (
	                                        <Card className="TestDetails">
	                                            <Accordion.Toggle as={Card.Header} eventKey={index+1}>
	                                                Question {index+1}:
	                                            </Accordion.Toggle>
	                                            <Accordion.Collapse eventKey={index+1}>
													<Card.Body>
													    <Card.Text contentEditable id={row._id}>
													    {row.question}
													    </Card.Text>
													    <ListGroup variant="flush">
													        <ListGroup.Item contentEditable onClick={() => this.selectAnswer('A'+(index+1)+1, row._id, 1)} id={'A'+(index+1)+1}>
													        {row.option1}
													        </ListGroup.Item>
													        <ListGroup.Item contentEditable onClick={() => this.selectAnswer('A'+(index+1)+2, row._id, 2)} id={'A'+(index+1)+2}>
													        {row.option2}
													        </ListGroup.Item>
													        <ListGroup.Item contentEditable onClick={() => this.selectAnswer('A'+(index+1)+3, row._id, 3)} id={'A'+(index+1)+3}>
													        {row.option3}
													        </ListGroup.Item>
													        <ListGroup.Item contentEditable onClick={() => this.selectAnswer('A'+(index+1)+4, row._id, 4)} id={'A'+(index+1)+4}>
													        {row.option4}
													        </ListGroup.Item>
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
								                    Update
								                </Button>
								            : null
								        }
								    </ButtonGroup>
								    <br/>
								    <br/>
								    <Button 
								        className = "BtnAlign" 
								        onClick = {this.onModTest}
								    >
								        Modify Other Test
								    </Button>
								</div>
					    		</Card>
							</Col>
							<Col md={2}></Col>
						</Row>
						: null
					}
				</Container>
			</div>
		)
	}
}

export default UpdateTest;