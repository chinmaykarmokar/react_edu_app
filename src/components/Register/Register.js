import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import './Register.css';
import axios from 'axios';

class Register extends Component{

	state = {
		name : "",
		phone_no : "",
		username : "",
		password : "",
		email : "",
		institute_type : "Select your institute type",
		account_type : "",
		institute_name: "",
		institute: ""
	}

	changeSelectHandler = (event) => {
		this.setState({institute_type: event.target.value})
	}

	postDataHandler = () => {
		const headers = {
			'Content-Type': 'application/json'
		}

	    const post = {
	        name: this.state.name,
	        phone_no: this.state.phone_no,
	        username: this.state.username,
	        password: this.state.password,
	        email_id: this.state.email,
			institute_type: this.state.institute_type.toLowerCase(),
			institute_name: this.state.institute_name
	    }

	    axios.post('http://localhost:5000/edu/v1/users/teacher/add-user', post, {headers: headers})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.log(error.response);

			if(error.response['status'] == 401) {
				window.alert('Failed Login');
			}
		});

		
	}

	render(){
		return(
			<div className = "ParentDiv">
				<div className = "CardLayout">
				<h3>Register with us</h3>
				<hr className = "Line"/>
				<Form style = {{textAlign: "left", padding: "10px"}}>
					
					<Form.Group controlId="formBasicEmail">
					    <Form.Label >Name</Form.Label>
					    <Form.Control
					    	 type="text" 
					    	 placeholder="Enter your Name" 
					    	 className = "Field" 
					    	 value={this.state.name} 
					    	 onChange={(event) => this.setState({name: event.target.value})}  
					    />
					</Form.Group>
				 		
				<br/>
				
					<Form.Group controlId="formBasicNumber">
					    <Form.Label className = "FormLabel">Phone Number</Form.Label>
					    <Form.Control
					    	 type="number" 
					    	 placeholder="Enter your Phone Number" 
					    	 className = "Field" 
					    	 value={this.state.phone_no} 
					    	 onChange={(event) => this.setState({phone_no: event.target.value})}  
					    />
				    </Form.Group>
				 
				<br/>
				
					<Form.Group controlId="formBasicUsername">
						<Form.Label className = "FormLabel">Username</Form.Label>
						<Form.Control
							 type="text" 
							 placeholder="Enter your Username" 
							 className = "Field" 
							 value={this.state.username} 
							 onChange={(event) => this.setState({username: event.target.value})}  
						/>
					</Form.Group>
					
				<br/>
				
					<Form.Group controlId="formBasicPassword">
						<Form.Label className = "FormLabel">Password</Form.Label>
						<Form.Control
							 type="password" 
							 placeholder="Enter your Password" 
							 className = "Field"
							 onChange={(event) => this.setState({password: event.target.value})}  
						/>
					</Form.Group>
						
				<br/>
				
					<Form.Group controlId="formBasicAccount">
						<Form.Label className = "FormLabel">Account Type</Form.Label>
						<Form.Control
							 type="text" 
							 placeholder="Enter your Account Type" 
							 className = "Field" 
							 value={this.state.account_type} 
							 onChange={(event) => this.setState({account_type: event.target.value})}  
						/>
					</Form.Group>
				
				<br/>
					
					<Form.Group controlId="formBasicEmail">
						<Form.Label className = "FormLabel">Email ID</Form.Label>
						<Form.Control
							 type="text" 
							 placeholder="Enter your Email ID" 
							 className = "Field" 
							 value={this.state.email} 
							 onChange={(event) => this.setState({email: event.target.value})}  
						/>
					</Form.Group>
				
				<br/>
				
					<Form.Group controlId="exampleForm.ControlSelect1">
					    <Form.Label className = "FormLabel">Select your Institute</Form.Label>
					    <Form.Control 
					    	as="select"
					    	onChange={this.changeSelectHandler}
					    	placeholder="Select a person"
					    	className = "SelectField"
					    	defaultValue={this.state.institute_type}
					    >
						    <option value = {"School"}>School</option>
						    <option value = {"Junior College"}>Junior College</option>
						    <option value = {"Degree College"}>Degree College</option>
					    </Form.Control>
					</Form.Group>
				   	
				<br/>
				
					<Form.Group controlId="formBasicEmail">
						<Form.Label className = "FormLabel">Institute Name</Form.Label>
						<Form.Control
							 type="text" 
							 placeholder="Enter your Institute Name" 
							 className = "Field" 
							 value={this.state.institute_name} 
							 onChange={(event) => this.setState({institute_name: event.target.value})}  
						/>
					</Form.Group>
				</Form>	
				<br/>
				<div className = "BtnAlign">
					<button className = "SubmitData" onClick = {this.postDataHandler}>Register</button>
				</div>
				</div>	
			</div>
		)
	}
}

export default Register;