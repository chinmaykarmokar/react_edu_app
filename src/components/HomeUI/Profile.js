import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfImg from '../../assets/vk.webp';
import "./Profile.css";

const profile = (props) => {

	return(
		<div>
			<Container>
				<Row>
					<Col md = {3}></Col>
				    <Col md = {6} style = {{textAlign:"center"}}>
						<img src={ProfImg} className = "Profile"/>
						<br/>
						{/* <h3>{props.userName}</h3> */}
				    </Col>
				    <Col md = {3}></Col>
			    </Row>
			</Container>
			<br/>
			<Container>
				<Row>
					<Col md = {8}>
						<div className = "AboutCardOne">
							<h4>Institute Name: </h4>
							<h5>{props.instituteName}</h5>
						</div>
					</Col>
				    <Col md = {4}>
				    	<div className = "AboutCardTwo">
				    		<h4>Institute Type: </h4>
							<h5>{props.instituteType}</h5>
				    	</div>
				    </Col>
			    </Row>
			</Container>
			<br/>
			<Container>
				<Row>
					<Col md = {4}>
						<div className = "AboutCardOne" style = {{backgroundColor: "#009999", color: "#fff"}}>
							<h4>Trials Left: </h4>
							<h5>{props.noFreeTrial}</h5>
						</div>
					</Col>
				    <Col md = {8}>
				    	<div className = "AboutCardTwo" style = {{backgroundColor: "#fff", color: "#000"}}>
				    		<h4>Email Id</h4>
							<h5>{props.emailId}</h5>
				    	</div>
				    </Col>
			    </Row>
			</Container>
			<br/>
			<Container>
				<Row>
					<Col md = {8}>
						<div className = "AboutCardOne">
							<h4>Account Creation Date</h4>
							<h5>{props.createdDate}</h5>
						</div>
					</Col>
				    <Col md = {4}>
				    	<div className = "AboutCardTwo">
							<h4>Contact: </h4>
							<h5>{props.phoneNo}</h5>
				    	</div>
				    </Col>
			    </Row>
			</Container>
		</div>
	)
}

export default profile;