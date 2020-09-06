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
import './SeeRoom.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import { toast } from 'react-toastify';
import Navibar from '../../Navibar/Navibar'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);



// Component Definition:

class SeeRoom extends Component{
    state = {
        loading: true,
        chart: null,
        total: 0,
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

    getRoomsData = (pageNo) => {
        const token = window.sessionStorage.getItem('token');
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		}
		const tokenData = this.parseJwt(token);
        // alert(JSON.stringify(tokenData));
        const teacherId = tokenData['_id']

		const url = 'http://localhost:5000/edu/v1/rooms/get-room?room_id=all&teacher_id='+teacherId+'&pageno='+pageNo
        console.log(url)

		axios.get(url, {headers: headers})
		.then(response =>{
			console.log([response['data']["rooms_data"]["data"]]);

			if(response['status'] == 200) {
                this.setState({total: response['data']["rooms_data"]["total"]});
                this.setState({pageNo: response['data']["rooms_data"]["pageno"]});
                this.setState({previous: response['data']["rooms_data"]["previous"]});
                this.setState({next: response['data']["rooms_data"]["next"]});
                this.setState({roomData: response['data']["rooms_data"]["data"]});
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
            this.setState({pageNo: pageNo});
            this.getRoomsData(pageNo);
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

    createChart = () => {
        let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
        let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

        // {
        //     "teacher_id": "5f26d3e1188353aca57d6c76",
        //     "limit": 10,
        //     "agenda": "Semester I",
        //     "room_name": "Physics Test 1",
        //     "room_id": "4355cc88-d4d3-11ea-a8a1-b42e998c02ed",
        //     "created": "2020-08-02T20:47:22.110600"
        // }
        
        const children = []

        for(let j=0; j<this.state.roomData.length ;j++){
            children.push({
                name: this.state.roomData[j].room_name,
                value: this.state.roomData[j].limit,
                id: this.state.roomData[j].room_id
            })
        }
         chart.data = [
            {
                name: "Teacher",
                children: children
            }
        ]
        // chart.data[0].children = children;
        // console.log(chart.data);
        console.log(this.state.roomData.length);
        console.log(children);

        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.children = "children";
        // networkSeries.nodes.template.tooltipText = "{name}:{value}";
        networkSeries.nodes.template.tooltipText = "{name}: {value}";
        networkSeries.nodes.template.fillOpacity = 1;

        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 10;
        networkSeries.minRadius = 30;
        networkSeries.maxRadius = 50;

        networkSeries.links.template.strokeWidth = 1;

        let hoverState = networkSeries.links.template.states.create("hover");
        hoverState.properties.strokeWidth = 3;
        hoverState.properties.strokeOpacity = 1;

        networkSeries.nodes.template.events.on("over", function(event) {
            event.target.dataItem.childLinks.each(function(link) {
                link.isHover = true;
            })
            if (event.target.dataItem.parentLink) {
                event.target.dataItem.parentLink.isHover = true;
            }
        })

        networkSeries.nodes.template.events.on("out", function(event) {
            event.target.dataItem.childLinks.each(function(link) {
                link.isHover = false;
            })
            if (event.target.dataItem.parentLink) {
                event.target.dataItem.parentLink.isHover = false;
            }
        })

        networkSeries.nodes.template.events.on("hit", function(event) {
            console.log(event.target.dataItem.dataContext);

            const roomId = event.target.dataItem.dataContext.id;
            console.log(roomId);

            if(roomId != undefined){
                const token = window.sessionStorage.getItem('token');
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const teacherId = tokenData['_id']
                // const teacherId = this.state.teacherId;
                const url = 'http://localhost:3000/#/room-get?room_id='+roomId+'&teacher_id='+teacherId;
                // window.open(url, '_blank');
                window.location.href = url;
            }
        });
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false})
            const token = window.sessionStorage.getItem('token');
            const tokenData = this.parseJwt(token)
            const user_id = tokenData['_id']
            this.setState({teacherId:user_id})

            this.getRoomsData(1);
			// this.createChart();
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
                                                <h3>Room's List:</h3>
                                                <hr className = "Line"/>
                                            </div>
                                            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                                            <br/>
                                            <div>
                                                <ButtonGroup aria-label="Basic example">
                                                    <Button variant="success" onClick={this.handlePrevious}>Previous</Button>
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

export default SeeRoom;