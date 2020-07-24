import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Category from './Category';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(0)
		// margin:theme.spacing(3)
	}
}));

const Products = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Category />
		</div>
	);
};

export default Products;
