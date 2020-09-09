import React, { Component } from 'react';
import axios from 'axios';
import './SeeTest.css';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar'

class SeeTest extends Component{

    state = {
        rows: [
            {name: 'Frozen yoghurt', fat: 159, carbs: 6.0, calories: 24, protein: 4.0},
            {name: 'Ice cream sandwich', fat: 237, carbs: 9.0, calories: 37, protein: 4.3},
            {name: 'Eclair', fat: 262, carbs: 16.0, calories: 24, protein: 6.0},
            {name: 'Cupcake', fat: 305, carbs: 3.7, calories: 67, protein: 4.3},
            {name: 'Gingerbread', fat: 356, carbs: 16.0, calories: 49, protein: 3.9},
        ],
        rowsPerPage: 10,
        page: 1,
        total: 2,
        pageNo: 1,
        previous: null,
        next: null,
        testData: [],
        loading: true,
    }
    

    parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    getTestData = (pageNo) => {
        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
		// const tokenData = this.parseJwt(token);
		// alert(JSON.stringify(tokenData));

		const url = 'http://localhost:5000/edu/v1/tests/get-test?testid=all&pageno=' + pageNo

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

    handleChangePage = (No) => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            
            let pageNo = parseInt(No);
            console.log(pageNo);
            this.setState({page: pageNo});
            this.getTestData(pageNo);
          }, 1000);
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

    handleNext = () => {
        const page = this.state.page;
        if(page <= this.state.total){
            this.handleChangePage(page+1);
        }
        else{
            // alert('Limit Exceeded')
            this.notify('error', 'You"re on last page');
        }
    }

    handlePrevious = () => {
        const page = this.state.page;
        if(page > 0){
            this.handleChangePage(page-1);
        }
        else{
            // alert('Limit Receeded')
            this.notify('error', 'You"re on first page');
        }
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
            this.setState({loading: false});
            this.getTestData(1);
          }, 1000);
    }

    render(){
        return(
            this.state.loading ? <Spinner/> :
            <div>
                <Navibar/>
                <Container fluid="md">
                    <Row>
                        <Col md={12}>
                            <Card className="Card">
                                <Card.Body>
                                    <br/>
                                    <h4>Test Lists:</h4>
                                    <hr className="LoginLine"/>
                                    <br/>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th align="right">Test Id</th>
                                                <th align="right">Details</th>
                                                <th align="right">Schedule</th>
                                                <th align="right">Duration</th>
                                                <th align="right">Start Time</th>
                                                <th align="right">End Time</th>
                                                <th align="right">No of Questions</th>
                                                {/* <th align="right">Deleted</th>
                                                <th align="right">Customer Id</th> */}
                                                {/* <th align="right">Test Id</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <div class="RowHeight">
                                            {Object.keys(this.state.testData).map((row) => (
                                                <tr>
                                                    {/* <td>{JSON.stringify(row)}</td> */}
                                                    <td>
                                                        <a href={"/#/test-get?testid=" + this.state.testData[row][0]['id']}>
                                                            {this.state.testData[row][0]['id']}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        {this.state.testData[row][0]['details']}
                                                    </td>
                                                    <td>
                                                        {this.state.testData[row][0]['schedule']}
                                                    </td>
                                                    <td>
                                                        {this.state.testData[row][0]['duration']}
                                                    </td>
                                                    <td>
                                                        {this.state.testData[row][0]['start_time']}
                                                    </td>
                                                    <td>
                                                        {this.state.testData[row][0]['end_time']}
                                                    </td>
                                                    <td>
                                                        {this.state.testData[row][0]['no_mandatory_questions']}
                                                    </td>
                                                    {/* <td>
                                                        {this.state.testData[row][0]['deleted'] ? this.state.testData[row][0]['deleted']: 0}
                                                    </td>
                                                    <td>
                                                        {this.state.testData[row][0]['customerid']}
                                                    </td> */}
                                                    {/* <td>
                                                        {this.state.testData[row][0]['testid']}
                                                    </td> */}
                                                </tr>
                                            ))}
                                            </div>
                                        </tbody>
                                    </Table>
                                    <br/>
                                    <div>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="success"onClick={this.handlePrevious}>Previous</Button>
                                            {
                                                this.getPages()
                                            }
                                            <Button variant="success" onClick={this.handleNext}>Next</Button>
                                        </ButtonGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SeeTest;