import React, { useContext, useState } from 'react';
import { contextApi } from '../context/Context';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { toast } from 'react-toastify';
import FarmerDetails from './FarmersDetails';
import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	CardActions,
	Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './styles';
import headCells from './header';
const useStyles = makeStyles(() => styles);

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

export default function EnhancedTable() {
	const classes = useStyles();
	// const [data] = React.useState([]);
	const [open, setOpen] = useState(false);
	const { dealDisplay } = useContext(contextApi);
	console.log(dealDisplay);

	const postOffer = () => {
		// try {
		// 	const res = await ProductsApi.post(
		// 		`/create/${productDetails.agentId}`,
		// 		data
		// 		// header
		// 	);
		// 	setLoading(false);
		// 	console.log(res);
		if (dealDisplay.length) return;
		toast.success('product Uploaded succesfully', {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000
		});
		setOpen(false);

		// 	console.log(res);
		// } catch (error) {
		// 	// setAlert(true);
		// 	console.log({ error });
		// 	toast.error('There was a problem in uploading your product', {
		// 		position: toast.POSITION.TOP_RIGHT,
		// 		autoClose: 5000
		// 	});
		// 	console.log(error);
		// }
		// setLoading(false);
	};

	React.useEffect(() => {}, []);

	return (
		<div className={classes.root}>
			<Card>
				<div className={classes.cardHead}>
					<CardHeader title={'Upload A Deal'} />
					<FarmerDetails />
				</div>
				<Divider />
				<CardContent className={classes.content}>
					{!dealDisplay.length ? (
						<h2>Send in Your Offer for Review</h2>
					) : (
						<TableContainer>
							<Table
								className={classes.table}
								aria-labelledby='tableTitle'
								aria-label='enhanced table'>
								<EnhancedTableHead classes={classes.head} />
								<TableBody>
									{dealDisplay.map((row, index) => {
										return (
											<TableRow
												hover // tabIndex={-1}
												key={row.id}>
												<TableCell component='th' scope='row' padding='none'>
													{row.farmerName}
												</TableCell>
												<TableCell align='right'>{row.product}</TableCell>
												<TableCell align='right'>{row.location}</TableCell>
												<TableCell align='right'>{row.qty}</TableCell>
												<TableCell align='right'>{row.price}</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</CardContent>
				{dealDisplay.length && (
					<CardActions className={classes.actions}>
						<Button color='primary' size='small' variant='contained'>
							SUBMIT REQUEST
						</Button>
					</CardActions>
				)}
			</Card>
		</div>
	);
}

EnhancedTableHead.propTypes = {
	// classes: PropTypes.object.isRequired,
	// numSelected: PropTypes.number.isRequired,
	// onRequestSort: PropTypes.func.isRequired,
	// onSelectAllClick: PropTypes.func.isRequired,
	// order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	// orderBy: PropTypes.string.isRequired,
	// rowCount: PropTypes.number.isRequired
};
