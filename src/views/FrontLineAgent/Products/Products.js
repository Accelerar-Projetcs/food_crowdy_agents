import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import AllProducts from './AllProducts';
import Category from './Category';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
		// margin:theme.spacing(3)
	}
}));

const Products = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<Category />
				</Grid>
				<Grid item lg={8} md={12} xl={9} xs={12}>
					<AllProducts />
				</Grid>
			</Grid>
		</div>
	);
};

export default Products;
