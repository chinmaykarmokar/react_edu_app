import React, { Component } from 'react';
import Home from '../../HomeUI/Home';
import Profile from '../../HomeUI/Profile';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav'
import './TestMenu.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Spinner from '../../Spinner/Spinner';
import Navibar from '../../Navibar/Navibar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
						<br/>
						<Row>
							<Col md={4}></Col>
							<Col md={4}>
							<Nav justify variant="Nav" defaultActiveKey="/home">
								<Nav.Item >
									<Nav.Link className="Nav active" eventKey="home" onClick = {this.handleHome}>Home</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className="Nav" eventKey="profile" onClick = {this.handleProfile}>Profile</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className="Nav" eventKey="billing">Billing</Nav.Link>
								</Nav.Item>
							</Nav>
							</Col>
							<Col md={4}></Col>
						</Row>
						<br/>
						{/* <h3 className = "Header" id="userName">Welcome, {this.state['userName']}</h3>
						<hr className = "LineStyleTop"/> */}
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