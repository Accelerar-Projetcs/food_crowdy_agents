import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
  Button,
  makeStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { data, options } from './chart';

const useStyles = makeStyles(() => ({
	root: {},
	chartContainer: {
		height: 400,
		position: 'relative'
	},
	actions: {
		justifyContent: 'flex-end'
	}
}));

const ActivityChart = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader
				action={
					<Button size='small' variant='text'>
						AUGUST <ArrowDropDownIcon />
					</Button>
				}
				title='Performance Chart'
			/>
			<Divider />
			<CardContent>
				<div className={classes.chartContainer}>
					<Bar data={data} options={options} />
				</div>
			</CardContent>
			<Divider />
			<CardActions className={classes.actions}>
				<Button color='primary' size='small' variant='text'>
					Overview <ArrowRightIcon />
				</Button>
			</CardActions>
		</Card>
	);
};

export default ActivityChart;
