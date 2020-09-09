import React from 'react';
import emptyLogo from '../../assets/images/directory.svg';
import product from '../../assets/images/category.svg';
import { Style } from './Style';
import { makeStyles, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => Style(theme));

const EmptyList = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<img height='100' src={emptyLogo} alt='Empty List' />
		</div>
	);
};

export const Product = ({ title }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<img height='150' src={product} alt='Products' />
			<Typography variant='body1'>{title}</Typography>
		</div>
	);
};

export default EmptyList;
