import React, { Component } from 'react';
import Home from './Home';
import Profile from './Profile';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import Tab from '@material-ui/core/Tab';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './HomeUI.css';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../Spinner/Spinner';

class HomeUI extends Component{

	state = {
		showHome: false,
		showProfile: false,
		showBilling: false,
		loading: true,
		userName: '',
		phoneNo: '',
		instituteType: '',
		emailId: '',
		instituteName: '',
		noFreeTrial: '',
		createdDate: ''
	}

	handleHome = () => {
		if (this.state.showProfile) {
			this.setState({showProfile:false});
		}
		if (this.state.showBilling) {
			this.setState({showBilling:false});
		}
		this.setState({showHome:true})
	}

	handleProfile = () => {
		if (this.state.showHome) {
			this.setState({showHome:false});
		}
		if (this.state.showBilling) {
			this.setState({showBilling:false});
		}
		this.setState({showProfile:true})
	}

	parseJwt = (token) => {
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			return null;
		}
	  };

	getAccountData = () => {
		// alert('account');

		const token = window.sessionStorage.getItem('token');

		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}

		const tokenData = this.parseJwt(token);
		// alert(JSON.stringify(headers));

		// const user_id = tokenData['_id']
		//const url = 'http://localhost:5000/edu/v1/users/teacher/get-user?user=' + user_id

		const url = 'http://localhost:5000/edu/v1/users/teacher/get-user?user=5f32c46289e2a466fe6b1946'

		axios.get(url, {headers: headers})
		.then(response =>{
			console.log(response);

			if(response['status'] == 200) {
				// this.setState({successAlert: true});
				this.setState({userName: response['data']['users']['name']});
				this.setState({phoneNo: response['data']['users']['phone_no']});
				this.setState({instituteType: response['data']['users']['institute_type']});
				this.setState({emailId: response['data']['users']['email_id']});
				this.setState({instituteName: response['data']['users']['institute_name']});
				this.setState({noFreeTrial: response['data']['users']['no_free_trial']});
				this.setState({createdDate: response['data']['users']['created']});
			}
		})
		.catch(error => {
			console.log(error.response);

			if(error.response['status'] == 401) {
				window.alert('Failed Login');
			}
		});
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
			this.setState({showHome:true})

			/*this.getAccountData();*/
		  }, 1000);
	}

	/*handleBilling = () => {
		this.setState({showBilling:true})
	}*/

	render(){
		return(
			this.state.loading ? <Spinner/> :
			    <div className = "Home">
					{/* <h3 className = "Header" id="userName">Welcome, {this.state['userName']}</h3>
					<hr className = "LineStyleTop"/> */}
					{/* <br/> */}
					<div style = {{textAlign: "center"}}>
						<ButtonGroup size="lg" className="mb-2">
						    <Button onClick = {this.handleHome}>Home</Button>
						    <Button onClick = {this.handleProfile}>Profile</Button>
						    <Button>Billing</Button>
						</ButtonGroup>
					</div>
					<br/>
					<h3 className = "Header" id="userName">Welcome, {this.state['userName']}</h3>
					<hr className = "LineStyleTop"/>
					<br/>
					<div>
						{this.state.showHome ?
						 	<Home/> :
						 	null
						}

						{this.state.showProfile ?
							<Profile 
								userName={this.state['userName']}
								phoneNo={this.state['phoneNo']}
								instituteType={this.state['instituteType']}
								emailId={this.state['emailId']}
								instituteName={this.state['instituteName']}
								noFreeTrial={this.state['noFreeTrial']}
								createdDate={this.state['createdDate']}
							/> :
						   	null
						} 
					</div>			       
			    </div>	
		)
	}
}

export default HomeUI;