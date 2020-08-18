import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCalendarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import HomeCards from './HomeCards';

import Spinner from '../Spinner/Spinner';

class Home extends Component{

	state = {
		// loading: true
	}

	// componentDidMount() {
	//     setTimeout(() => {
	//           this.setState({loading: false})
	//         }, 1000)
	// }

	render(){
		return(
			<div>
				<Container>
					<Row>				
						<Col md = {2}></Col>
					    <Col md = {4}>
							<a href="/#/test/">
					        <HomeCards className = "EventCard">
					        	<h3 className = "Header">Tests</h3>
					        	<hr className = "LineStyle"/>
					        	<div style = {{textAlign:"center", fontSize: "50px"}}>
					        		<FaBookOpen style = {{color: "navy"}}/>
					        	</div>	
					        </HomeCards>
							</a>
					    </Col>
					    <Col md = {4}>
							<HomeCards>
					        	<h3 className = "Header">Events</h3>
					        	<hr className = "LineStyle"/>
					        	<div style = {{textAlign:"center", fontSize: "50px"}}>
					        		<FaRegCalendarAlt style = {{color: "navy"}}/>
					        	</div>
					        </HomeCards>
					    </Col>
					    <Col md = {2}></Col>
				    </Row>
				</Container>
				<Container>
					<Row>
						<Col md = {2}></Col>
					    <Col md = {4}>
							<HomeCards>
					        	<h3 className = "Header">Rooms</h3>
					        	<hr className = "LineStyle"/>
					        	<div style = {{textAlign:"center", fontSize: "50px"}}>
					        		<FaUsers style = {{color: "navy"}}/>
					        	</div>
					        </HomeCards>
					    </Col>
					    <Col md = {4}>
					        <HomeCards>
					        	<h3 className = "Header">Contacts</h3>
					        	<hr className = "LineStyle"/>
					        	<div style = {{textAlign:"center", fontSize: "50px"}}>
					        		<FaGooglePlus style = {{color: "navy"}}/>
					        	</div>
					        </HomeCards>
					    </Col>
					    <Col md = {2}></Col>
				    </Row>
				</Container>
				<Container>
					<Row>
						<Col md = {2}></Col>
					    <Col md = {4}>
							<HomeCards>
					        	<h3 className = "Header">Stats</h3>
					        	<hr className = "LineStyle"/>
					        	<div style = {{textAlign:"center", fontSize: "50px"}}>
					        		<FaChartBar style = {{color: "navy"}}/>
					        	</div>	
					        </HomeCards>
					    </Col>
					    <Col md = {4}>
					        <HomeCards>
					        	<h3 className = "Header">Settings</h3>
					        	<hr className = "LineStyle"/>
					        	<div style = {{textAlign:"center", fontSize: "50px"}}>
					        		<FaCogs style = {{color: "navy"}}/>
					        	</div>
					        </HomeCards>
					    </Col>
					    <Col md = {2}></Col>
				    </Row>
				</Container>
			</div>
		)
	}
}

export default Home;