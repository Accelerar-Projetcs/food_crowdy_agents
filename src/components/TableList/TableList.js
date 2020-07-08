import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
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

function createData(name, category, location, noOfParts, totalPrice, id) {
	return { name, category, location, noOfParts, totalPrice, id };
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
	{ id: 'name', numeric: false, disablePadding: true, label: 'PRODUCTS' },
	{ id: 'CATEGORY', numeric: true, disablePadding: false, label: 'CATEGORY' },
	{ id: 'LOCATION', numeric: true, disablePadding: false, label: 'LOCATION' },
	{ id: 'MAX-PARTS', numeric: true, disablePadding: false, label: 'MAX-PARTS' },
	{ id: 'DATE', numeric: true, disablePadding: false, label: 'DATE' },
	{
		id: 'TOTAL PRICE',
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

const Pending = ({ productData, title }) => {
	// const { title, productData, ...rest } = props;
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('category');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	console.log(title);

	const storeData = (data) => {
		const storedData = data.map((item) =>
			createData(
				item.title,
				item.category,
				item.discount,
				item.maxParticipants,
				item.bulkPrice,
				item._id
			)
		);
		return storedData;
	};

	const rows = [storeData([])];
	console.log(productData);

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
							<TableBody>
								{stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, row.name)}
												key={row.id}>
												<TableCell component='th' scope='row' padding='none'>
													{row.name.slice(0, 20)}
												</TableCell>
												<TableCell align='right'>{row.category}</TableCell>
												<TableCell align='right'>{row.location}</TableCell>
												<TableCell align='right'>{row.noOfParts}</TableCell>
												<TableCell align='right'>
													{formatter.format(row.totalPrice)}
												</TableCell>
												<TableCell align='right'>
													{' '}
													{moment(order.createdAt).format('DD/MM/YYYY')}
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
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
