// Import Modules:

import React, { Component } from 'react';
import Home from '../../HomeUI/Home';
import Profile from '../../HomeUI/Profile';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stepper from 'react-stepper-horizontal';
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import './SeeContact.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class SeeContact extends Component{

    state = {
        loading: true,
        total: 3,
        pageNo: 1,
    }

    parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

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

    handleChangePage = (No) => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            
            let pageNo = parseInt(No);
            console.log(pageNo);
            this.setState({pageNo: pageNo});
            this.getAccountContacts(pageNo);
            this.createChart();
          }, 1000);
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

    getAccountContacts = (pageNo) => {

    }

    createChart = () => {
        let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
        let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        networkSeries.data = [{
            name: 'Flora',
            children: [
                {
                    name: 'Black Tea', value: 7
                },
                {
                    name: 'Floral', value: 10
                },
                {
                    name: 'Chamomile', value: 5
                },
                {
                    name: 'Rose', value: 1
                }, 
                {
                    name: 'Jasmine', value: 8
                }
            ]
        }]

        networkSeries.dataFields.linkWith = "linkWith";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.id = "name";
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.children = "children";
        networkSeries.links.template.distance = 1.25;
        networkSeries.nodes.template.tooltipText = "{name}";
        networkSeries.nodes.template.fillOpacity = 1;
        networkSeries.nodes.template.outerCircle.scale = 1;

        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 10;
        networkSeries.nodes.template.label.hideOversized = true;
        networkSeries.nodes.template.label.truncate = true;
        networkSeries.minRadius = am4core.percent(5);
        networkSeries.manyBodyStrength = -5;
        networkSeries.links.template.strokeOpacity = 0;
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false});
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token)
            const user_id = tokenData['_id'];
            this.setState({teacherId: user_id});

			this.getAccountContacts(1);
          }, 1000);
          
        setTimeout(() => {
            this.createChart()}
        , 2500);
    }
    
    render(){
        return(
            <div>
            {
                this.state.loading? <Spinner/>:
                <div>
                    <Navibar/>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <br/>
                                <Card className="Card">
                                    <Card.Body>
                                        <br/>
                                        {/* <br/> */}
                                        <div align="center">
                                            <h3>Contact's List:</h3>
                                            <hr className = "Line"/>
                                        </div>
                                        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
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
            }
            </div>
        )
    }
}

export default SeeContact;