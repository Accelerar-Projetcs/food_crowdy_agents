import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import ActivityChart from './components/ActivityChart/ActivityChart';
import OtherMarketers from './components/OtherMarketers/OtherMarketers';
import TotalUsers from './components/TotalUsers/TotalUsers';
import TotalAgents from './components/TotalAgents/TotalAgents';
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
				<Grid item lg={4} sm={12} xl={6} xs={12}>
					<TotalAgents />
				</Grid>
				<Grid item lg={4} sm={12} xl={6} xs={12}>
					<TotalUsers />
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				<Grid item lg={12} sm={12} xl={8} xs={12}>
					<ActivityChart />
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				<Grid item lg={12} sm={12} xl={12} xs={12}>
					<OtherMarketers />
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
