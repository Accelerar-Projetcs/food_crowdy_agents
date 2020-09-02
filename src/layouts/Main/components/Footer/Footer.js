import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
		// background: theme.palatte.background.default
	}
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant='body1'>
				&copy;{' '}
				<Link component='a' href='https://foodcrowdy.com' target='_blank'>
					Food Crowdy
				</Link>
				2020
			</Typography>
			<Typography variant='caption'>This is our agents platforms</Typography>
		</div>
	);
};


export default Footer;
