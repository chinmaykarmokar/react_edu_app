import React, { Component } from 'react';
import Home from '../../HomeUI/Home';
import Profile from '../../HomeUI/Profile';
import axios from 'axios';
import './ContactMenu.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'
import Navibar from '../../Navibar/Navibar';

class ContactMenu extends Component{

    state = {
        loading: true,
        showHome: false,
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({loading: false});
            this.setState({showHome:true})
		  }, 1000);
    }

    render(){
        return(
            this.state.loading?<Spinner/>:
            <div>
                <Navibar/>
                <Container>
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
                    <div>
						{this.state.showHome ?
						 	<Home
								showContactMenu={true}
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
                </Container>
            </div>
        )
    }
}

export default ContactMenu;