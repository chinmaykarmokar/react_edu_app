import React, { Component } from 'react';
import Home from '../../HomeUI/Home';
import Profile from '../../HomeUI/Profile';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './TestMenu.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Spinner from '../../Spinner/Spinner';
import Navibar from '../../Navibar/Navibar'

class TestMenu extends Component{

	state = {
		showHome: false,
		showProfile: false,
		showBilling: false,
		loading: true,
		userName: '',
		phoneNo: '',
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
		const token = window.sessionStorage.getItem('token');
		const tokenData = this.parseJwt(token);
		this.setState({userName: tokenData['username']});
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
			this.setState({showHome:true})

			this.getAccountData();
		  }, 1000);
	}

	/*handleBilling = () => {
		this.setState({showBilling:true})
	}*/

	render(){
		return(
			this.state.loading ? <Spinner/> :
				<div>
					<Navibar/>
					<div className = "Home">
						<div style = {{textAlign: "center"}}>
							<ButtonGroup size="lg" className="mb-2">
								<Button 
									style = {{
										border:"none", 
										color:"#fff",
										width:"200px", 
										padding:"20px",
										fontSize:"15px",
										backgroundColor: "navy",
										boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
										borderTopLeftRadius: "50px",
										borderBottomLeftRadius: "50px",
									}} onClick = {this.handleHome}>Home</Button>					    	
								<Button 
									style = {{
										border:"none", 
										color:"#fff",
										width:"200px", 
										padding:"20px",
										backgroundColor: "navy",
										fontSize:"15px",
										boxShadow: "0px 0px 10px rgba(0,0,0,0.3)"
									}} onClick = {this.handleProfile}>Profile</Button>
								<Button 
									style = {{
										border:"none", 
										color:"#fff",
										width:"200px", 
										padding:"20px",
										backgroundColor: "navy",
										fontSize:"15px",
										boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
										borderTopRightRadius: "50px",
										borderBottomRightRadius: "50px",
									}} onClick = {this.handleBilling}>Billing</Button>
							</ButtonGroup>
						</div>
						<br/>
						<h3 className = "Header" id="userName">Welcome, {this.state['userName']}</h3>
						<hr className = "LineStyleTop"/>
						<br/>
						<div>
							{this.state.showHome ?
								<Home
									showTestMenu={true}
								/> :
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
				</div>
		)
	}
}

export default TestMenu;