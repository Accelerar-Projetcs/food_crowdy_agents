import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { userData } from '../../../../../../utils/GetUserData';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: 'fit-content'
	},
	avatar: {
		width: 60,
		height: 60
	},
	name: {
		marginTop: theme.spacing(1)
	}
}));

const Profile = (props) => {
	const { className, ...rest } = props;

	const userName = userData('firstName');
	const classes = useStyles();

	const user = {
		name: userName,
		avatar: '/images/avatars/avatar_11.png',
		bio: userName
	};


	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Avatar
				alt={user.name}
				className={classes.avatar}
				component={RouterLink}
				src={user.avatar}
				to='/settings'
			/>
			<Typography className={classes.name} variant='h4'>
				{user.userName}
			</Typography>
			<Typography variant='body2'>{user.bio}</Typography>
		</div>
	);
};

Profile.propTypes = {
	className: PropTypes.string
};

export default Profile;
