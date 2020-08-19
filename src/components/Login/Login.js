import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import './Login.css';
import axios from 'axios';
//import Spinner from '/Spinner/Spinner';

class Login extends Component{

	state = {
		username : "",
		password : "",
		successAlert : false,
		isLoading: true
	}

	componentDidMount() {
	    this.setState({isLoading: false})
	}

	postDataHandler = () => {
		
		const headers = {
			'Content-Type': 'application/json'
		}

		const postData = {
			username : this.state.username,
			password : this.state.password
		}

		console.log(postData);
		axios.post('http://localhost:5000/edu/v1/api/login', postData, {headers: headers})
		.then(response =>{
			console.log(response);

			if(response['status'] == 200) {
				this.setState({successAlert: true});

				window.sessionStorage.setItem('token', response.data['token']);

				window.location.href = "http://localhost:3000/#/home";
			}
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
			<div className = "LoginDiv">				
				<div className = "LoginCardLayout">
					<h3>Login</h3>
					<hr className = "LoginLine"/>
					<Form style = {{textAlign: "left", padding: "10px"}}>
						<div>
							<Form.Group controlId="formBasicEmail">
							    <Form.Label>Username</Form.Label>
							    <Form.Control
							    	 type="text" 
							    	 placeholder="Enter your username" 
							    	 className = "LoginField" 
							    	 value={this.state.username} 
							    	 onChange={(event) => this.setState({username: event.target.value})}  
							    />
							</Form.Group>
						</div>	
						<br/>
						<div>
							<Form.Group controlId="formBasicPassword">
							    <Form.Label>Password</Form.Label>
							    <Form.Control
							    	 type="password" 
							    	 placeholder="Enter your password" 
							    	 className = "LoginField"  
							    	 onChange={(event) => this.setState({password: event.target.value})}    
							    />
							</Form.Group>
						</div>
						<br/>
						<div className = "BtnAlign">
							<button className = "SubmitData" onClick = {this.postDataHandler}>Log In</button>
						</div>
					</Form>
				</div>
			
			</div>
			
		)
	}
}

export default Login;