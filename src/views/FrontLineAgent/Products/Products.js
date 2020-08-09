import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Category from './Category';

import { productsStyles } from './styles/Styles';

const useStyles = makeStyles((theme) => productsStyles(theme));

const Products = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Category />
		</div>
	);
};

export default Products;
