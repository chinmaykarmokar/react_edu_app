import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCalendarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import HomeCards from './HomeCards';
// import Button from '@material-ui/core/Button';
import { useSnackbar } from 'react-simple-snackbar'
// import Spinner from '../../../Spinner/Spinner';

const Home = (props) => {
	return(
		// this.state.loading ? <Spinner/> :
		<div>
			{
				props.showTestMenu ?
				<div>
					<Container>
						<Row>
						<Col md={1}></Col>
						<Col md={5}>
							<a href="/#/test-create">
							<HomeCards className = "EventCard">
								<h3 className = "Header">Create Tests</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaPlus style = {{color: "navy"}}/>
								</div>  
							</HomeCards>
							</a>
						</Col>
						<Col md={5}>
						<a href="/#/test-list">
							<HomeCards>
								<h3 className = "Header">See Tests</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaRegListAlt style = {{color: "navy"}}/>
								</div>
							</HomeCards>
						</a>
						</Col>
						<Col md={1}></Col>
						</Row>
					</Container>
					<Container>
						<Row>
						<Col md={1}></Col>
						<Col md={5}>
							<HomeCards>
								<h3 className = "Header">Update Tests</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaPencilAlt style = {{color: "navy"}}/>
								</div>
							</HomeCards>
						</Col>
						<Col md={5}>
							<HomeCards>
								<h3 className = "Header">Delete Tests</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaGooglePlus style = {{color: "navy"}}/>
								</div>
							</HomeCards>
						</Col>
						<Col md={1}></Col>
						</Row>
					</Container>
				</div>
				: null
			}
			{
				props.showHomeMenu ?
				<div>
					<Container>
						<Row>
						<Col md={1}></Col>
						<Col md={5}>
							<a href="/#/test-menu">
							<HomeCards className = "EventCard">
								<h3 className = "Header">Tests</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaBookOpen style = {{color: "navy"}}/>
								</div>  
							</HomeCards>
							</a>
						</Col>
						<Col md={5}>
							<HomeCards>
								<h3 className = "Header">Events</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaRegCalendarAlt style = {{color: "navy"}}/>
								</div>
							</HomeCards>
						</Col>
						<Col md={1}></Col>
						</Row>
					</Container>
					<Container>
						<Row>
						<Col md={1}></Col>
						<Col md={5}>
							<HomeCards>
								<h3 className = "Header">Rooms</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaUsers style = {{color: "navy"}}/>
								</div>
							</HomeCards>
						</Col>
						<Col md={5}>
							<HomeCards>
								<h3 className = "Header">Contacts</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaGooglePlus style = {{color: "navy"}}/>
								</div>
							</HomeCards>
						</Col>
						<Col md={1}></Col>
						</Row>
					</Container>
					<Container>
						<Row>
					    <Col md={1}></Col>
					    <Col md={5}>
					        <HomeCards>
					            <h3 className = "Header">Stats</h3>
					            <hr className = "LineStyle"/>
					            <div style = {{textAlign:"center", fontSize: "50px"}}>
					                <FaChartBar style = {{color: "navy"}}/>
					            </div>  
					        </HomeCards>
					    </Col>
					    <Col md={5}>
					        <HomeCards>
					            <h3 className = "Header">Settings</h3>
					            <hr className = "LineStyle"/>
					            <div style = {{textAlign:"center", fontSize: "50px"}}>
					                <FaCogs style = {{color: "navy"}}/>
					            </div>
					        </HomeCards>
					    </Col>
					    <Col md={1}></Col>
					    </Row>
					</Container>
				</div>
				: null
			}
			
		</div>
	)
}

export default Home;