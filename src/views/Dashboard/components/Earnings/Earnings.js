import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUp from '@material-ui/icons/ArrowUpwardTwoTone';
import MoneyIcon from '@material-ui/icons/Money';
import { formatter } from '../../../../utils/localStore';
import Style from './Style';

const useStyles = makeStyles((theme) => Style(theme));

const Earnings = ({ data }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid container justify='space-between'>
					<Grid item>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
							variant='body2'>
							Earnings
						</Typography>
						<Typography variant='h3'>{formatter.format(data || 0)}</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<MoneyIcon className={classes.icon} />
						</Avatar>
					</Grid>
				</Grid>
				<div className={classes.difference}>
					<ArrowUp className={classes.differenceIcon} />
					<Typography
						className={classes.differenceValue}
						variant='body2'></Typography>
				</div>
			</CardContent>
		</Card>
	);
};

export default Earnings;
