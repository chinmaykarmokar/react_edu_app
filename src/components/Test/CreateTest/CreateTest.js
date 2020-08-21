// Import Modules:

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stepper from 'react-stepper-horizontal';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './CreateTest.css'

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
        //     {
        //         question: "",
        //         options": [
        //             2",
        //             3",
        //             4",
        //             5"
        //         ],
        //         answer: "",
        //     }
        // ],
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

    selectAnswer = (answer_id) => {
        // window.alert(answer_id)
        for(let i=1; i<5; i++){

            let r = answer_id[1]
            let id = `A${r}${i}`
            // window.alert(id)
            // window.alert(id == answer_id)
            if(id == answer_id){
                document.getElementById(id).style.backgroundColor = '#00cccc';
                document.getElementById(id).style.color = '#000000';
            }
            else{
                document.getElementById(id).style.backgroundColor = '#ffffff';
            }
        }
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
    
    componentDidMount() {
		this.setState({showTestDetails:true})
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
                                            {/* <TextField 
                                                className = "Field" 
                                                id="standard-basic" 
                                                label="Details"
                                                value={this.state.details} 
                                                onChange={(event) => this.setState({details: event.target.value})}  
                                            /> */}
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
                                            {/* <TextField 
                                                className = "Field" 
                                                id="standard-basic" 
                                                label="Customer Id"
                                                value={this.state.customerId} 
                                                onChange={(event) => this.setState({customerId: event.target.value})}  
                                            /> */}
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
                                            {/* <TextField 
                                                className = "Field" 
                                                id="standard-basic" 
                                                label="No of Mandatory Questions"
                                                type="number"
                                                value={this.state.noMandatoryQuestions} 
                                                onChange={(event) => this.setState({noMandatoryQuestions: event.target.value})}  
                                            /> */}
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >No of Mandatory Questions</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    placeholder="Enter No of Mandatory Questions" 
                                                    className = "Field" 
                                                    value={this.state.noMandatoryQuestions} 
                                                    onChange={(event) => this.setState({noMandatoryQuestions: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            {/* <TextField
                                                className = "Field" 
                                                id="datetime-local"
                                                label="Schedule"
                                                type="datetime-local"
                                                className = "Field" 
                                                defaultValue="2017-05-24T10:30"
                                                onChange={(event) => this.setState({schedule: event.target.value})}
                                            /> */}
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Schedule</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    placeholder="Enter Test Schedule" 
                                                    className = "Field" 
                                                    value={this.state.schedule} 
                                                    onChange={(event) => this.setState({schedule: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            {/* <TextField
                                                className = "Field" 
                                                id="datetime-local"
                                                label="Start Time"
                                                type="datetime-local"
                                                defaultValue="2017-05-24T10:30"
                                                onChange={(event) => this.setState({startTime: event.target.value})}
                                            /> */}
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Start Time</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    placeholder="Enter Test Start Time" 
                                                    className = "Field" 
                                                    value={this.state.startTime} 
                                                    onChange={(event) => this.setState({startTime: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            {/* <TextField
                                                className = "Field" 
                                                id="datetime-local"
                                                label="End Time"
                                                defaultValue="2017-05-24T10:30"
                                                onChange={(event) => this.setState({endTime: event.target.value})}
                                            /> */}
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >End Time</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    placeholder="Enter Test End Time" 
                                                    className = "Field" 
                                                    value={this.state.endTime} 
                                                    onChange={(event) => this.setState({endTime: event.target.value})}  
                                                />
                                            </Form.Group>
                                        </div>
                                        <br/>
                                        <div>
                                            {/* <TextField 
                                                className = "Field" 
                                                id="standard-basic" 
                                                label="Duration"
                                                type="number"
                                                value={this.state.duration} 
                                                onChange={(event) => this.setState({duration: event.target.value})}  
                                            /> */}
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label >Duration</Form.Label>
                                                <Form.Control
                                                    type="text" 
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
                            {/* {
                                this.state.showTestQuestions ?
                                <div>
                                    <div>
                                        <h3>Enter Questions Data</h3>
                                        <Typography>Click to Select Correct Answer</Typography>
                                        <hr className = "Line"/>
                                    </div>
                                    <br/>
                                    {
                                        this.state.noQuestions.map((name, index) => (
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography>Question {index+1}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                    <div className="Field1">
                                                    <TextField 
                                                        required id="standard-required" 
                                                        label="Required"
                                                        id={`Q${index+1}`}
                                                    />
                                                    </div>
                                                    <br/>
                                                    <List 
                                                        component="nav" 
                                                        aria-label="main mailbox folders"
                                                        className="Field1"
                                                    >
                                                        <ListItem 
                                                            onClick={() => this.selectAnswer(`A${index+1}1`)} 
                                                            button id={`A${index+1}1`}
                                                        >
                                                            <ListItemText 
                                                                primary="->" 
                                                            />
                                                            <div contentEditable>Edit Answer</div>
                                                        </ListItem>
                                                        <ListItem 
                                                            onClick={() => this.selectAnswer(`A${index+1}2`)} 
                                                            button id={`A${index+1}2`}
                                                        >
                                                            <ListItemText 
                                                                primary="->" 
                                                            />
                                                            <div contentEditable>Edit Answer</div>
                                                        </ListItem>
                                                        <ListItem 
                                                            onClick={() => this.selectAnswer(`A${index+1}3`)} 
                                                            button id={`A${index+1}3`}
                                                        >
                                                            <ListItemText 
                                                                primary="->" 
                                                            />
                                                            <div contentEditable>Edit Answer</div>
                                                        </ListItem>
                                                        <ListItem 
                                                            onClick={() => this.selectAnswer(`A${index+1}4`)} 
                                                            button id={`A${index+1}4`}
                                                        >
                                                            <ListItemText 
                                                                primary="->" 
                                                            />
                                                            <div contentEditable>Edit Answer</div>
                                                        </ListItem>
                                                    </List>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))
                                    }
                                    <br/>
                                </div>
                                : null
                            } */}
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
                                                onClick = {this.onClickNext}
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