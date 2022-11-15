import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Modal from '../modal/Look/Look';
import {useState}  from "react";


function createData(changer,name, phone, acc, tariff, deleter) {
    return {
        changer,
        name,
        phone,
        acc,
        tariff,
        deleter,
    };
}

const rows = [
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
    createData('','Добрий день', '+380999999999', 3.7, 'Безліміт',''),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'changer',
        numeric: false,
        disablePadding: false,
        label: '',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Користувач',
    },
    {
        id: 'phone',
        numeric: true,
        disablePadding: false,
        label: 'Номер тел.',
    },
    {
        id: 'acc',
        numeric: true,
        disablePadding: false,
        label: 'Аккаунт',
    },
    {
        id: 'tariff',
        numeric: true,
        disablePadding: false,
        label: 'Тариф',
    },
    {
        id: 'deleter',
        numeric: true,
        disablePadding: false,
        label: '',
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead 
        >
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    color: 'white',
                                },
                                '&.Mui-active': {
                                    color: 'white !important',
                                },
                                '&:hover svg': {
                                    color: 'white',
                                },
                                '&.Mui-active svg': {
                                    color: 'white !important',
                                },
                            }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('phone');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalOpen, setModalOpen] = useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', mb: 2, justifyContent: 'space-between' }}>
                <TableContainer>
                    <Table
                        sx={{ width: "100%" }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            
                                            <TableCell align="right">{row.changer} </TableCell>
                                            <TableCell
                                                
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                className="openModal"
                                                onClick={() => {
                                                    setModalOpen(true);
                                                  }}
                                                  {...modalOpen && <Modal setOpenModal={setModalOpen} />}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.phone}</TableCell>
                                            <TableCell align="right">{row.acc}</TableCell>
                                            <TableCell align="right">{row.tariff}</TableCell>
                                            <TableCell align="right">{row.deleter}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
