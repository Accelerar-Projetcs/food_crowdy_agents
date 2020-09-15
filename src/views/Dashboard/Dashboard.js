import React from 'react';
import { makeStyles } from '@material-ui/styles';
import useAgent from '../../hooks/useAgent';
import { Grid } from '@material-ui/core';
import useHeader from '../../server/Headers';
import {
	Earnings,
	TotalProfit,
	FrontLineDownLines,
	TotalUserBrought
} from './components';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	}
}));

const Dashboard = () => {
	const classes = useStyles();
	const { headers } = useHeader();
	const { data, loading } = useAgent(`/fla/downliner`, headers);

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<Earnings />
				</Grid>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<TotalUserBrought totalUsers={data.length} />
				</Grid>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<TotalProfit />
				</Grid>
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<FrontLineDownLines data={data} loading={loading} />
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
