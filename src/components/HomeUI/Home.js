import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FaCalendarAlt, FaGooglePlus, FaRegTrashAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdPermContactCalendar } from "react-icons/md"
import { MdPersonPin } from "react-icons/md"
import { MdClose } from "react-icons/md"
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import HomeCards from './HomeCards';
import { BsPersonCheckFill, BsQuestionCircleFill } from "react-icons/bs";
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
							<Col>
							<Card style = {{border:"none", boxShadow:"0px 0px 10px rgba(0,0,0,0.2)"}}>
								<Card.Body>
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
						<a href="/#/test-mod">
							<HomeCards>
								<h3 className = "Header">Update Tests</h3>
								<hr className = "LineStyle"/>
								<div style = {{textAlign:"center", fontSize: "50px"}}>
									<FaPencilAlt style = {{color: "navy"}}/>
								</div>
							</HomeCards>
						</a>
						</Col>
						<Col md={5}>
							<a href="/#/test-del">
								<HomeCards>
									<h3 className = "Header">Delete Tests</h3>
									<hr className = "LineStyle"/>
									<div style = {{textAlign:"center", fontSize: "50px"}}>
										<MdClose style = {{color: "navy"}}/>
									</div>
								</HomeCards>
							</a>
						</Col>
						<Col md={1}></Col>
						</Row>
					</Container>
								</Card.Body>
							</Card>
							</Col>
							
						</Row>
					</Container>
				</div>
				: null
			}
			{
				props.showRoomMenu ?
				<div>
					<Container>
						<Row>
							<Col>
								<Card style = {{border:"none", boxShadow:"0px 0px 10px rgba(0,0,0,0.2)"}}>
									<Card.Body>
										<Container>
											<Row>
												<Col md={1}></Col>
												<Col md={5}>												
													<a href="/#/room-create">
													<HomeCards className = "EventCard">
														<div style = {{textAlign:"left", padding:"10px"}}>
															<FaPlus style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
															<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Create Rooms</h3>
															<h6 style = {{marginLeft:"70px", color:"grey"}}>Create room</h6>
														</div>
													</HomeCards>
													</a>
												</Col>
												<Col md={5}>
													<a href="/#/room-list">
													<HomeCards className = "EventCard">
														<div style = {{textAlign:"left", padding:"10px"}}>
															<FaRegListAlt style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
															<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>See Rooms</h3>
															<h6 style = {{marginLeft:"70px", color:"grey"}}>Check your tests</h6>
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
											<a href="/#/room-mod">
											<HomeCards className = "EventCard">
												<div style = {{textAlign:"left", padding:"10px"}}>
													<FaPencilAlt style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
													<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Update Rooms</h3>
													<h6 style = {{marginLeft:"70px", color:"grey"}}>Create room</h6>
												</div>
											</HomeCards>
											</a>
											</Col>
											<Col md={5}>
												<a href="/#/room-del">
												<HomeCards className = "EventCard">
													<div style = {{textAlign:"left", padding:"10px"}}>
														<MdClose style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Delete Rooms</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>Delete room</h6>
													</div>
												</HomeCards>
												</a>
											</Col>
											<Col md={1}></Col>
											</Row>
										</Container>
									</Card.Body>
								</Card>
							</Col>
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
							<Col>
								<Card style = {{border:"none", boxShadow:"0px 0px 10px rgba(0,0,0,0.2)"}}>
  									<Card.Body>
									  	<Container>
											<Row>
											<Col md={1}></Col>
											<Col md={5}>
												<a href="/#/test-menu">
													<HomeCards className = "EventCard">
														<div style = {{textAlign:"left", padding:"10px"}}>
															<FaBookOpen style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
															<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Tests</h3>
															<h6 style = {{marginLeft:"70px", color:"grey"}}>manage tests</h6>
														</div>
													</HomeCards>
												</a>
											</Col>
											<Col md={5}>
												<a href="/#/event-list">
												<HomeCards>
													<div style = {{textAlign:"left", padding:"10px"}}>
														<FaRegCalendarAlt style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Events</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>manage events</h6>
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
												<a href="/#/room-menu">
												<HomeCards>
													<div style = {{textAlign:"left", padding:"10px"}}>
														<FaUsers style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Rooms</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>manage rooms</h6>
													</div>
												</HomeCards>
												</a>
											</Col>
											<Col md={5}>
												<a href="/#/contact-menu">
												<HomeCards>													
													<div style = {{textAlign:"left", padding:"10px"}}>
														<FaGooglePlusG style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Contacts</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>manage contacts</h6>
													</div>
												</HomeCards>
												</a>							
											</Col>
											<Col md={1}></Col>
											</Row>

											<Row>
											<Col md={1}></Col>
											<Col md={5}>
												<a href="/#/room-menu">
												<HomeCards>
													<div style = {{textAlign:"left", padding:"10px"}}>
														<BsPersonCheckFill style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Enroll</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>manage student enrolls</h6>
													</div>
												</HomeCards>
												</a>
											</Col>
											<Col md={5}>
												<a href="/#/contact-menu">
												<HomeCards>													
													<div style = {{textAlign:"left", padding:"10px"}}>
														<BsQuestionCircleFill style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Help</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>get help</h6>
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
												<a href="/#/stats">
												<HomeCards>													
													<div style = {{textAlign:"left", padding:"10px"}}>
														<FaChartBar style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Reports</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>fetch/download reports</h6>
													</div>
												</HomeCards>
												</a>
											</Col>
											<Col md={5}>
												<a href="/#/settings-menu">
												<HomeCards>													
													<div style = {{textAlign:"left", padding:"10px"}}>
														<FaCogs style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Settings</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>change app settings</h6>
													</div>
												</HomeCards>
												</a>
											</Col>
											<Col md={1}></Col>
											</Row>
										</Container>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
				: null
			}
			{
				props.showContactMenu ?
				<div>
					<Container>
						<Row>
							<Col>
								<Card style = {{border:"none", boxShadow:"0px 0px 10px rgba(0,0,0,0.2)"}}>
									<Card.Body>
										<Container>
											<Row>
											<Col md={1}></Col>
											<Col md={5}>
												<a href="/#/contact-create">
													<HomeCards className = "EventCard">
														<div style = {{textAlign:"left", padding:"10px"}}>
															<MdPermContactCalendar style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
															<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Add Contact</h3>
															<h6 style = {{marginLeft:"70px", color:"grey"}}>create new contact</h6>
														</div>
													</HomeCards>
												</a>
											</Col>
											<Col md={5}>
												<a href="/#/contact-list">
												<HomeCards>
													<div style = {{textAlign:"left", padding:"10px"}}>
														<FaUsers style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>See Contacts</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>see contacts</h6>
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
												<a href="/#/contact-mod">
												<HomeCards>
													<div style = {{textAlign:"left", padding:"10px"}}>
														<MdPersonPin style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Update Contact</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>update contact</h6>
													</div>
												</HomeCards>
												</a>
											</Col>
											<Col md={5}>
												<a href="/#/contact-del">
												<HomeCards>													
													<div style = {{textAlign:"left", padding:"10px"}}>
														<FaRegTrashAlt style = {{color: "navy", fontSize:"50px"}} className = "d-inline float"/>
														<h3 className = "d-inline" style = {{margin:"20px", fontSize:"35px"}}>Delete Contact</h3>
														<h6 style = {{marginLeft:"70px", color:"grey"}}>delete contact</h6>
													</div>
												</HomeCards>
												</a>							
											</Col>
											<Col md={1}></Col>
											</Row>
										</Container>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
				: null
			}
		</div>
	)
}

export default Home;