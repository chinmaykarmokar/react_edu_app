import React, { Component } from 'react';
import axios from 'axios';
import './SeeTest.css';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import Table from 'react-bootstrap/Table'

const SeeTest = (props) => {
    const rows = [
        {name: 'Frozen yoghurt', fat: 159, carbs: 6.0, calories: 24, protein: 4.0},
        {name: 'Ice cream sandwich', fat: 237, carbs: 9.0, calories: 37, protein: 4.3},
        {name: 'Eclair', fat: 262, carbs: 16.0, calories: 24, protein: 6.0},
        {name: 'Cupcake', fat: 305, carbs: 3.7, calories: 67, protein: 4.3},
        {name: 'Gingerbread', fat: 356, carbs: 16.0, calories: 49, protein: 3.9},
    ];
    const rowsPerPage = 10;
    const page = 1;
    const loading = true;


    // const getTestData = () => {
    //     console.log('gtd');
    // }

    // const handleChangePage = (event) => {
    //     console.log(event.target);
    //     let pageNo = parseInt(event.target);
    //     console.log(pageNo);
    // }

    // const handleChangeRowsPerPage = () => {
    //     return null;
    // }

    // const TablePaginationActions = () => {
    //     return null;
    // }

    componentDidMount() {
        setTimeout(() => {
            loading: false,
            getTestData();
          }, 1000);
    }

    return(
        {
            loading ? <Spinner/> :
            <div className = "ParentDiv">
                <div className = "CardLayout">
                    <Table responsive>
                        <th>
                            <tr>
                                <td align="right">Dessert (100g serving)</td>
                                <td align="right">Calories</td>
                                <td align="right">Fat&nbsp;(g)</td>
                                <td align="right">Carbs&nbsp;(g)</td>
                                <td align="right">Protein&nbsp;(g)</td>
                            </tr>
                        </th>
                        <tbody>
                            {rows.map((row) => (
                            <tr key={row.name}>
                                <td component="th" scope="row">
                                    {row.name}
                                </td>
                                <td align="right">
                                    {row.calories}
                                </td>
                                <td align="right">
                                    {row.fat}
                                </td>
                                <td align="right">
                                    {row.carbs}
                                </td>
                                <td align="right">
                                    {row.protein}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        }
    )
}

export default SeeTest;