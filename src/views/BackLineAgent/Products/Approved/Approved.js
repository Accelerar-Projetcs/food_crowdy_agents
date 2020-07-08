import React from 'react';
import PropTypes from 'prop-types';
import { getUserId } from '../../../../utils/localStore';
import { makeStyles } from '@material-ui/core/styles';
import { agentProducts } from '../../../../utils/FetchData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

function createData(id, name, updateRequest, DeleteRequest) {
	return { id, name, updateRequest, DeleteRequest };
}

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
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'PRODUCTS'
	},
	{
		id: 'UPDATE REQUEST',
		numeric: true,
		disablePadding: false,
		label: 'UPDATE REQUEST'
	},
	{
		id: 'DELETE REQUEST',
		numeric: true,
		disablePadding: false,
		label: 'DELETE REQUEST'
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
	table: {
		minWidth: 750,
		margin: '0 .5rem'
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

export default function EnhancedTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('category');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [data, setData] = React.useState([]);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const storeData = (data) => {
		const storedData = data.map((item) =>
			createData(item._id, item.title, item._id, item._id)
		);

		return storedData;
	};

	const rows = [storeData(data)];
	const agentId = getUserId();
	React.useEffect(() => {
		agentProducts(`/agent/myupload/approved/${agentId}`).then((data) => {
			setData(data.data);
		});
	}, [agentId]);

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
				<CardHeader title={'Approved Products'} />
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
								rowCount={rows.length}
							/>
							<TableBody>
								{stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										return (
											<TableRow
												hover // tabIndex={-1}
												key={row.id}>
												<TableCell component='th' scope='row' padding='none'>
													{row.name.slice(0, 20)}....
												</TableCell>
												<TableCell align='right'>
													{' '}
													<Link
														className='custom-btn custom-btn-sm custom-btn-secondary'
														to={`/agents-request-product-update/${row.id}`}>
														Update
													</Link>
												</TableCell>
												<TableCell align='right'>
													<Link
														className='custom-btn-sm custom-btn custom-btn-danger'
														to={`/agents-request-product-delete/${row.id}`}>
														Delete
													</Link>
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows[0].length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Card>
		</div>
	);
}
