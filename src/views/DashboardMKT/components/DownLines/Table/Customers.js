import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PerfectScroll from 'react-perfect-scrollbar';
import LoadingCenter from '../../../../../components/BackDrop/BackDrop';
import EmptyList from '../../../../../components/EmptyList/EmptyList';
import {
	Card,
	CardHeader,
	CardContent,
	TablePagination,
	TableContainer,
	TableBody,
	Divider,
	Table,
	TableCell,
	// Button,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography
} from '@material-ui/core';

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

function stableSort(array, comparator) {
	const arr = array;
	const stabilizedThis = arr.map((el, index) => [el, index]);

	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{ id: 'Name', numeric: true, disablePadding: false, label: 'Name' },
	{
		id: 'Registration Date',
		numeric: true,
		disablePadding: false,
		label: 'Registration Date'
	}
];

function EnhancedTableHead(props) {
	const { order, orderBy } = props;
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell key={headCell.id}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}>
							{headCell.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
	root: {
	},
	btn: {
		marginTop: theme.spacing(2)
	},
	table: {
		minWidth: 750,
		margin: '0 .5rem'
	},
	icon: {
		marginBottom: theme.spacing(-0.8)
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	}
}));

const SuccessFulPurchase = ({ title, Products = [], loading }) => {
	const classes = useStyles();
	// const history = useHistory();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('category');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = Products.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (id) => {
		// const selectedIndex = selected.indexOf(
		// history.push(`/sales/customers/orders-details/${id}`);
		// let newSelected = [];
		// if (selectedIndex === -1) {
		// 	newSelected = newSelected.concat(selected, name);
		// } else if (selectedIndex === 0) {
		// 	newSelected = newSelected.concat(selected.slice(1));
		// } else if (selectedIndex === selected.length - 1) {
		// 	newSelected = newSelected.concat(selected.slice(0, -1));
		// } else if (selectedIndex > 0) {
		// 	newSelected = newSelected.concat(
		// 		selected.slice(0, selectedIndex),
		// 		selected.slice(selectedIndex + 1)
		// 	);
		// }
		// setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const customerDetails = (id) =>
	// 	history.push(`/sales/customers/orders-details/${id}`);

	return (
		<div className={classes.root}>
			{loading && <LoadingCenter />}
			<Card>
				<CardHeader title={<Typography variant='h3'>{title}</Typography>} />
				<Divider />
				<PerfectScroll>
					<CardContent className={classes.content}>
						{!Products.length ? (
							<EmptyList />
						) : (
							<>
								<TableContainer>
									<Table
										className={classes.table}
										aria-labelledby='tableTitle'
										aria-label='enhanced table'>
										<EnhancedTableHead
											classes={classes}
											numSelected={selected.length}
											order={order}
											orderBy={orderBy}
											onSelectAllClick={handleSelectAllClick}
											onRequestSort={handleRequestSort}
											rowCount={Products.length}
										/>
										{Products && (
											<TableBody>
												{stableSort(Products, getComparator(order, orderBy))
													.slice(
														page * rowsPerPage,
														page * rowsPerPage + rowsPerPage
													)
													.map((row) => (
														<TableRow hover key={row._id}>
															<TableCell>{row.name}</TableCell>
															<TableCell>
																{moment(row.createdAt).format('LLL')}
															</TableCell>
														</TableRow>
													))}
											</TableBody>
										)}
									</Table>
								</TableContainer>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									component='div'
									count={Products.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</>
						)}
					</CardContent>
				</PerfectScroll>
			</Card>
		</div>
	);
};

export default SuccessFulPurchase;
