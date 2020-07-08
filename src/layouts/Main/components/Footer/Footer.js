import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
		// background: theme.palatte.background.default
	}
}));

const Footer = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
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

Footer.propTypes = {
	className: PropTypes.string
};

export default Footer;
