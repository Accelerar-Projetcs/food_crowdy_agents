import React, { useContext, useState } from 'react';
import { contextApi } from '../context/Context';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BackDrop from '../BackDrop/BackDrop';
import { formatter } from '../../utils/localStore';
import FarmerDetails from './FarmersDetails';
import styles from './styles';
import headCells from './TableHeader';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Alert, AlertTitle } from '@material-ui/lab';

import {
	Table,
	TableBody,
	TableCell,
	Card,
	Tooltip,
	// TableContainer,
	TableRow,
	TableSortLabel,
	TableHead,
	CardContent,
	CardHeader,
	Divider,
	Button,
	CardActions,
	Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => styles);

function EnhancedTableHead() {
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						// align={headCell.numeric}
						padding={'none'}>
						<TableSortLabel>{headCell.label}</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default function EnhancedTable() {
	const classes = useStyles();
	const { dealDisplay, postOffer, loading } = useContext(contextApi);

	React.useEffect(() => {}, [dealDisplay, loading]);


	return (
		<div className={classes.root}>
			{loading && <BackDrop text='Sending offer please wait.....' />}
			<Card>
				<CardHeader action={<FarmerDetails />} title='Deals' />
				<Divider />
				<CardContent className={classes.content}>
					{!dealDisplay.length ? (
						<CardContent className={classes.contentCard}>
							<h2>Send in Your Offer for Review</h2>
							<Divider />
							<Typography className={classes.block} variant='body1'>
								Make passive income by bringing in great offers for review
							</Typography>
							<Alert className={classes.block} color='info'>
								<AlertTitle>Backline Agent</AlertTitle>
							</Alert>
							<Typography className={classes.block} variant='body1'>
								Please after sending in your review please wait for admin to
								confirm and accept this offer before it can be publish to our
								website
							</Typography>
						</CardContent>
					) : (
						<PerfectScrollbar>
							<div className={classes.inner}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Farmer</TableCell>
											<TableCell>Product</TableCell>
											<TableCell>Location</TableCell>
											<TableCell sortDirection='desc'>
												<Tooltip enterDelay={300} title='Sort'>
													<TableSortLabel active direction='desc'>
														Qty
													</TableSortLabel>
												</Tooltip>
											</TableCell>
											<TableCell>Price</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{dealDisplay.map((row, index) => {
											return (
												<TableRow hover key={row.id}>
													<TableCell component='th' scope='row'>
														{row.farmerName}
													</TableCell>
													<TableCell>{row.deal}</TableCell>
													<TableCell>{row.location}</TableCell>
													<TableCell>{row.qty}</TableCell>
													<TableCell>
														{formatter.format(row.price || 0)}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</div>
						</PerfectScrollbar>
					)}
				</CardContent>
				<Divider />
				{dealDisplay.length ? (
					<CardActions className={classes.actions}>
						<Button
							onClick={() => {
								// setLoader(true);
								postOffer();
							}}
							color='primary'
							size='small'
							disabled={loading ? true : false}
							variant='contained'>
							SUBMIT REQUEST
						</Button>
					</CardActions>
				) : (
					''
				)}
			</Card>
		</div>
	);
}

EnhancedTableHead.propTypes = {
	// classes: PropTypes.object.isRequired,
};
