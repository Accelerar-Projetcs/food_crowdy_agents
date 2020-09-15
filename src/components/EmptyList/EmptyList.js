import React from 'react';
import emptyLogo from '../../assets/images/directorcy.svg';
import product from '../../assets/images/category.svg';
import { Style } from './Style';
import { makeStyles, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => Style(theme));

const EmptyList = ({ imageFile, title }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<img height='100' src={imageFile} alt='Empty List' />
			<Typography variant='body1'>{title}</Typography>
		</div>
	);
};

EmptyList.defaultProps = {
	imageFile: emptyLogo,
	title: ''
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
