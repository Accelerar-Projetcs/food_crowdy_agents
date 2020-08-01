import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
// import LoadingCenter from '../LoadingCenter/LoadingCenter';
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
	TableHead,
	TableRow,
	TableSortLabel
} from '@material-ui/core';
import { contextApi } from '../context/Context';

function createData(
	name,
	category,
	location,
	noOfParts,
	totalPrice,
	id,
	Farmlocation
) {
	return { name, category, location, noOfParts, totalPrice, id, Farmlocation };
}

const formatter = new Intl.NumberFormat('en-NG', {
	style: 'currency',
	currency: 'NGN'
});
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
	const arr = array[0];
	const stabilizedThis = arr.map((el, index) => [el, index]);

	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Agent ID' },
	{ id: 'CATEGORY', numeric: true, disablePadding: false, label: 'Farmer' },
	// { id: 'Title', numeric: true, disablePadding: false, label: 'Title' },
	{ id: 'location', numeric: true, disablePadding: false, label: 'Location' },
	{ id: 'DATE', numeric: true, disablePadding: false, label: 'DATE' },
	{
		id: ' Price',
		numeric: true,
		disablePadding: false,
		label: 'TOTAL PRICE'
	}
];

function EnhancedTableHead(props) {
	const { order, orderBy } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}>
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
		width: '100%',
		display: 'grid',
		placeItems: 'center',
		margin: theme.spacing(4)
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

const Pending = ({ title, Products }) => {
	const classes = useStyles();
	const { pendingProducts } = useContext(contextApi);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('category');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const storeData = (data) => {
		const storedData = data.map((item) =>
			createData(
				item.agentId,
				item.title,
				item.farmerName,
				item.location,
				item.agentPriceOffer,
				item.createdAt,
				item._id
			)	
		);
		return storedData;
	};
	const rows = [storeData(Products || [])];

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
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
				selected.slice(selectedIndex + 1)
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

	return (
		<div className={classes.root}>
			<Card>
				<CardHeader title={title} />
				<Divider />
				<CardContent className={classes.content}>
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
								rowCount={rows[0].length}
							/>
							{Products ? (
								<TableBody>
									{stableSort(rows, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											return (
												<TableRow
													hover
													onClick={(event) => handleClick(event, row.name)}
													key={Math.random(3, 30)}>
													<TableCell component='th' scope='row' padding='none'>
														{row.name.slice(0, 20)}
													</TableCell>
													<TableCell align='right'>{row.category}</TableCell>
													<TableCell align='right'>{row.noOfParts}</TableCell>
													{/* <TableCell align='right'>{row.title}</TableCell> */}
													<TableCell align='right'>
														{moment(order.createdAt).format('DD/MM/YYYY')}
													</TableCell>
													<TableCell align='right'>
														{formatter.format(row.totalPrice)}
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							) : (
								// <LoadingCenter text='fetching data' />
								''
							)}
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={rows[0].length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default Pending;
