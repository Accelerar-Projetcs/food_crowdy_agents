import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Typography,
	Button,
	CardActions
} from '@material-ui/core';
import { userData } from '../../../../utils/GetUserData';
import {
	LocationOnOutlined,
	MailOutline,
	PersonOutlined
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
	item: {
		display: 'flex',
		flexDirection: 'column'
	},
	title: {
		textTransform: 'capitalize'
	}
}));

const Notifications = (props) => {
	const { className, ...rest } = props;
	const firstName = userData('firstName');
	const lastName = userData('lastName');
	const email = userData('email');
	const uniqueId = userData('uniqueId');
	const state = userData('state');

	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<form>
				<CardHeader
					subheader=''
					title={
						<Typography variant='h3'>{`${firstName} ${lastName}`}</Typography>
					}
				/>
				<Divider />
				<CardContent>
					<Typography gutterBottom className={classes.title} variant='h6'>
						<MailOutline /> <br /> {email}
					</Typography>
					<Typography gutterBottom className={classes.title} variant='h6'>
						<PersonOutlined /> <br /> <strong> {uniqueId}</strong>
					</Typography>
					<Typography gutterBottom className={classes.title} variant='h6'>
						<LocationOnOutlined /> <br /> <strong> {state} State</strong>
					</Typography>
				</CardContent>
				<Divider />
				<CardActions>
					<Button
						variant='outlined'
						href={`/forgot-password`}
						size={'small'}
						color='primary'>
						Change Password
					</Button>
				</CardActions>
			</form>
		</Card>
	);
};

Notifications.propTypes = {
	className: PropTypes.string
};

export default Notifications;
