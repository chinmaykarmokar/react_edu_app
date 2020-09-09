// Import Modules:

import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FaCalendarAlt, FaGooglePlus, FaRegTrashAlt } from "react-icons/fa";
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../Navibar/Navibar'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Component Definition:

class RoomUI extends Component{

    state = {
        loading: true,
        total: 10,
        pageNo: 0,
        previous: 0,
        next: 0,
        roomData: [],
        testData: [],
    }

    notify = (notify_type, notify_msg) => {
        if(notify_type == 'error'){
            toast.error(notify_msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        if(notify_type == 'success'){
            toast.success(notify_msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    
    parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    handleChangePage = (No) => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            
            let pageNo = parseInt(No);
            console.log(pageNo);
            this.setState({pageNo: pageNo});
            this.getTestData(pageNo);
          }, 1000);
    }

    getTestData = (pageNo) => {
        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
        const baseUrl = 'http://localhost:5000/edu/v1/tests/get-test?testid=all&pageno=' + pageNo
        const params = '&cols=id,details,schedule,duration'
        const url = baseUrl + params

		axios.get(url, {headers: headers})
		.then(response =>{
			console.log([response['data']["test_data"]["total"]]);
			if(response['status'] == 200) {
                this.setState({total: response['data']["test_data"]["total"]});
                this.setState({pageNo: response['data']["test_data"]["pageno"]});
                this.setState({previous: response['data']["test_data"]["previous"]});
                this.setState({next: response['data']["test_data"]["next"]});
                this.setState({testData: response['data']["test_data"]["data"]});
			}
		})
		.catch(error => {
			console.log(error.response);
			// if(error.response['status'] == 401) {
			// 	window.alert('Failed Login');
			// }
		});
    }

    getPages = () => {
        const pagesButtons = []
        console.log(this.state.total)
        for(let i=1; i<=this.state.total; i++) {
            pagesButtons.push(
                <Button variant="primary" onClick={() => this.handleChangePage(i)}>
                    {/* {JSON.stringify(this.state.total)} */}
                    {i}
                </Button>
            )
        }
        return pagesButtons
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
            this.setState({showHome:true})
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token)
            const user_id = tokenData['_id']
            this.setState({teacherId:user_id})
            this.getTestData(1);
		  }, 1000);
    }
    
    render(){
        return(
        <div>
            {
            this.state.loading? <Spinner/>:
            <div>
                <Navibar/>
                <br/>
                <Container fluid>
                    <Row>
                        <Col md={2}>
                            <Card>
                                <Card.Img 
                                    variant="top" 
                                    src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
                                    style={{'height': '20vh'}}
                                />
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col md={10}>
                            <Card>
                                <br/>
                                <div align="center">
                                    <h3>Test's List:</h3>
                                    <hr className = "Line"/>
                                </div>
                                <Row>
                                {
                                    Object.keys(this.state.testData).map((row) => (
                                    <Col md={4} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>
                                        <Card className="Card">
                                            <Card.Img 
                                                variant="top" 
                                                src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
                                                style={{'height': '15vh'}}
                                            />
                                            <Card.Body>
                                                <Card.Title>
                                                    Details: {this.state.testData[row]['details']}
                                                </Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    Id: {this.state.testData[row]['id']}
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    Duration: {this.state.testData[row]['duration']}
                                                </Card.Text>
                                                <Card.Text>
                                                    Schedule: {this.state.testData[row]['schedule']}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    ))
                                }
                                </Row>
                                <br/>
                                <br/>
                                <div align="center">
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="success" onClick={this.handlePrevious}>Previous</Button>
                                        {
                                            this.getPages()
                                        }
                                        <Button variant="success" onClick={this.handleNext}>Next</Button>
                                    </ButtonGroup>
                                </div>
                                <br/>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            }
        </div>
        )
    }
}

export default RoomUI;