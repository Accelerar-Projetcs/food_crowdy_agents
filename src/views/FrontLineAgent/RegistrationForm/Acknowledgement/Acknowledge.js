import React from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Divider,
	makeStyles
} from '@material-ui/core';
import { CheckCircleOutline as CheckCircleOutlineIcon } from '@material-ui/icons';
import Styles from './Styles';

const useStyles = makeStyles((theme) => Styles(theme));

const Acknowledgement = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<CardHeader title='Registration Completed' />
				<Divider />
				<CardContent>
					<CheckCircleOutlineIcon className={classes.icon} />
					<Typography variant='body1' className={classes.link}>
						Thank you for your interest in partnering with us as an agent, your
						application has been received and is being processed. You will get a
						response from us as soon as we complete our verification process.
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default Acknowledgement;
