import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
	ApprovedDeals,
	PendingOffers,
	Earnings,
	TotalProfit,
	TotalUserBrought
} from './components';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	}
}));

const Dashboard = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<Earnings />
				</Grid>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<TotalUserBrought />
				</Grid>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<TotalProfit />
				</Grid>
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<ApprovedDeals />
				</Grid>
				<Grid item lg={8} md={12} xl={9} xs={12}>
					<PendingOffers className='new-file' />
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;