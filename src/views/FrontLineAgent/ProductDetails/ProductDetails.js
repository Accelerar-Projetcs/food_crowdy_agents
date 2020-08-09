import React, { useEffect } from 'react';
import { ProductsApiHooks } from '../../../server/Server';
import { Media } from '../../../components/BackDrop/AppShell';
import { makeStyles } from '@material-ui/styles';
import ProductsDetailsData from './ProductDetailData';
import {productDetailStyle} from './styles/Styles';


const useStyles = makeStyles((theme) => (productDetailStyle(theme)));
const ProductDetails = ({ match }) => {
	const classes = useStyles();
	const [{ data, loading }] = ProductsApiHooks(`/${match.params.id}`);

	useEffect(() => {}, [match.params.id]);
	return (
		<>
			<div className={classes.root}>
				{loading ? <Media /> : <ProductsDetailsData data={data} />}
			</div>
		</>
	);
};

export default ProductDetails;
