import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getUserName } from '../../../../utils/localStore';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {},
	details: {
		display: 'flex'
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

const AccountProfile = (props) => {
	const { className, ...rest } = props;
	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent>
				<div className={classes.details}>
					<div>
						<Typography gutterBottom variant=''>
							<strong>{getUserName()}</strong>
						</Typography>
						<Typography
							className={classes.locationText}
							color='textSecondary'
							variant='body1'></Typography>
						<Typography
							className={classes.dateText}
							color='textSecondary'
							variant='body1'></Typography>
					</div>
				</div>
			</CardContent>
			<Divider />
		</Card>
	);
};

AccountProfile.propTypes = {
	className: PropTypes.string
};

export default AccountProfile;
