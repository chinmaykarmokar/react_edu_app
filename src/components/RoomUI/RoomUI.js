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

// Component Definition:

class RoomUI extends Component{

    state = {
        loading: true,
        total: 10,
        pageNo: 0,
        previous: 0,
        next: 0,
        roomData: [],
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
                                {/* <br/> */}
                                <Row>
                                    <Col md={4} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>
                                        <Card className="Card">
                                            <Card.Img 
                                                variant="top" 
                                                src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
                                                style={{'height': '15vh'}}
                                            />
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>
                                        <Card className="Card">
                                            <Card.Img 
                                                variant="top" 
                                                src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
                                                style={{'height': '15vh'}}
                                            />
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>
                                        <Card className="Card">
                                            <Card.Img 
                                                variant="top" 
                                                src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
                                                style={{'height': '15vh'}}
                                            />
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col md={4} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>
                                        <Card>
                                            <Card.Img 
                                                variant="top" 
                                                src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
                                                style={{'height': '15vh'}}
                                            />
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>
                                        <Card>
                                            <Card.Img 
                                                variant="top" 
                                                src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
                                                style={{'height': '15vh'}}
                                            />
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>
                                        <Card>
                                            <Card.Img 
                                                variant="top" 
                                                src="https://cdn.pixabay.com/photo/2018/02/14/17/49/histogram-3153437_960_720.png" 
                                                style={{'height': '15vh'}}
                                            />
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
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