import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardActions,
	CardContent,
	Avatar,
	Typography,
	Divider,
	Button,
	CardHeader,
	TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {},
	details: {
		display: 'block'
	},
	avatar: {
		marginLeft: 'auto',
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0
	},
	progress: {
		marginTop: theme.spacing(2)
	},
	uploadButton: {
		marginRight: theme.spacing(2)
	}
}));

const FarmersDetails = (props) => {
	const { className, ...rest } = props;
	const classes = useStyles();
	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader
				subheader='This infomations can be edited'
				title='Farmers Details'
			/>
			<Divider />
			<CardContent>
				<div className={classes.details}>
					<TextField
						fullWidth
						label='Farmers Name'
						margin='dense'
						name='farmerName'
						onChange={'handleChange'}
						value={''}
						variant='outlined'
					/>
					<TextField
						fullWidth
						label='Farmer Loction'
						margin='dense'
						name='farmerLocation'
						onChange={'handleChange'}
						value={''}
						variant='outlined'
					/>
					<TextField
						fullWidth
						label='Deal'
						margin='dense'
						name='farmerDeal'
						onChange={'handleChange'}
						value={''}
						variant='outlined'
					/>
				</div>
			</CardContent>
		</Card>
	);
};

FarmersDetails.propTypes = {
	className: PropTypes.string
};

export default FarmersDetails;
