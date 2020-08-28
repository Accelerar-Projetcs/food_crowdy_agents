import React, { useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardActions,
	CardHeader,
	CardContent,
	Button,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import StatusBullet from '../../../../components/StatusBullet/StatusBullet';

const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 800
	},
	statusContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	status: {
		marginRight: theme.spacing(1)
	},
	actions: {
		justifyContent: 'flex-end'
	}
}));

const statusColors = {
	delivered: 'success',
	pending: 'info',
	refunded: 'danger'
};

const OtherMarketers = () => {
	const classes = useStyles();

	const [orders] = useState(mockData);

	return (
		<Card className={classes.root}>
			<CardHeader title='Markerters Activity Board' />
			<Divider />
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Markerters ID</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Users</TableCell>
									<TableCell>Agents</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map((order) => (
									<TableRow hover key={order.id}>
										<TableCell>{order.ref}</TableCell>
										<TableCell>{order.customer.name}</TableCell>
										<TableCell>
											{moment(order.createdAt).format('DD/MM/YYYY')}
										</TableCell>
										<TableCell>
											<div className={classes.statusContainer}>
												<StatusBullet
													className={classes.status}
													color={statusColors[order.status]}
													size='sm'
												/>
												{order.status}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</PerfectScrollbar>
			</CardContent>
			<Divider />
			<CardActions className={classes.actions}>
				<Button color='primary' size='small' variant='text'>
					View all <ArrowRightIcon />
				</Button>
			</CardActions>
		</Card>
	);
};

export default OtherMarketers;
