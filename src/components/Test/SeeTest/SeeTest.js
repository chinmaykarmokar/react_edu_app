import React, { Component } from 'react';
import axios from 'axios';
import './SeeTest.css';
// import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

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


    const getTestData = () => {
        console.log('gtd');
    }

    const handleChangePage = (event) => {
        console.log(event.target);
        let pageNo = parseInt(event.target);
        console.log(pageNo);
    }

    const handleChangeRowsPerPage = () => {
        return null;
    }

    const TablePaginationActions = () => {
        return null;
    }

    return(
        <div className = "ParentDiv">
			<div className = "CardLayout">
                <TableContainer component={Paper}>
                    <Table className="" aria-label="customized table">
                    <TableHead>
                    <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow> */}
                        {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                         */}
                        <div className="pagination">
                            <Pagination 
                                count={10} 
                                color="primary" 
                                showFirstButton 
                                showLastButton 
                                onClick={handleChangePage}
                            />
                        </div>
                        {/* </TableRow>
                    </TableFooter> */}
                    </Table>
            </TableContainer>
            </div>
        </div>
    )
}

export default SeeTest;