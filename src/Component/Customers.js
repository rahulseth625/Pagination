import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import '../Css/Customer.css';
import '../Css/Toggle.css';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";


const Customers = (props) => {

    const [customerList, setCustomerList] = useState({
        data: [],
    })

    const [selected, setSelected] = useState(false);

    const useStyles = makeStyles({
        table: {
            minWidth: 650
        }
    });

    const classes = useStyles();

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [bidsData, setBids] = useState([]);

    const [isShow, setShow] = useState(false) 

    var data = []
    var handleClick = (row) => {
        setBids(row.bids);
        setShow(true)
        data = row.bids
    }

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, customerList.data.length - page * rowsPerPage);


    const customerLists = () => {
        axios.get('https://intense-tor-76305.herokuapp.com/merchants')
            .then((response) => {
                if (response.statusText === 'OK') {
                    setCustomerList(response);
                } else {
                    return alert('something went wrong');
                }
            })
    }

    customerList.data.sort((a, b) => {
        if (Math.max.apply(null, a.bids.map(x => x.amount)) < Math.max.apply(null, b.bids.map(x => x.amount))) {
            return -1;
        }
        if (Math.min.apply(null, a.bids.map(x => x.amount)) > Math.min.apply(null, b.bids.map(x => x.amount))) {
            return 1;
        }
        return 0;
    });

    const toggleSelected = () => {
        setSelected(!selected);
    }

    const mounted = useRef();

    useEffect(() => {
        customerLists();
        setBids(data);
    }, []
    )

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Premium</TableCell>
                            <TableCell align="right">
                                <div className="toggle-container" onClick={toggleSelected}>
                                    <div className={`dialog-button ${selected ? "" : "disabled"}`}>
                                        {selected ? "Min" : "Max"}
                                    </div>
                                </div>
                                        Bids
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerList.data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}
                                    component={Link} to="/dashboard"
                                    onClick={() => handleClick(row)}
                                >
                                    <TableCell component="th" scope="row" className="withprewrap">
                                        {row.firstname} {row.lastname}
                                        {'\n'}
                                          avatar : {row.avatarUrl}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.hasPremium.toString()}</TableCell>
                                    <TableCell align="right"> {selected ? Math.min.apply(null, row.bids.map(x => x.amount))
                                        : Math.max.apply(null, row.bids.map(x => x.amount))
                                    }
                                    </TableCell>
                                </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={customerList.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            { isShow ? <Dashboard dataParentToChild={bidsData} /> : null }
        </div>
    )
}

export default Customers;
