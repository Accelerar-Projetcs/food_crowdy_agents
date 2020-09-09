import React from 'react';
import OrdersTable from './Table/TableBody';
import { makeStyles } from '@material-ui/core';
import { Style } from './Style';

const useStyles = makeStyles((theme) => Style(theme));

const Orders = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<OrdersTable />
		</div>
	);
};

export default Orders;
