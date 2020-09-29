import React from 'react';
import useAgent from '../../../hooks/useAgent';
import { Media } from '../../../components/BackDrop/AppShell';
import { makeStyles } from '@material-ui/styles';
import ProductsDetailsData from './ProductDetailData';
import { productDetailStyle } from './styles/Styles';

const useStyles = makeStyles((theme) => productDetailStyle(theme));
const ProductDetails = ({ match }) => {
	const classes = useStyles();
	const { data, loading } = useAgent(`/products/${match.params.id}`);

	return (
		<div className={classes.root}>
			{loading ? <Media /> :(  <ProductsDetailsData data={data} loading={loading} />)}
		</div>
	);
};

export default ProductDetails;
