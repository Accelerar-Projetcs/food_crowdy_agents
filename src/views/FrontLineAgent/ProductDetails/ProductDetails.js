import React, { useState, useEffect } from 'react';
import { ProductsApiHooks } from '../../../server/Server';
// import { toast } from 'react-toastify';
import { Media } from '../../../components/BackDrop/AppShell';
import { makeStyles } from '@material-ui/styles';
// import { getUserName } from '../../../utils/localStore';
import ProductsDetailsData from './ProductDetailData';

const useStyles = makeStyles(() => ({
	root: {
		margin: `.4rem`
	}
}));

const ProductDetails = ({ match }) => {
	const classes = useStyles();
	// const [data, setData] = useState('');
	// const [loading, setLoading] = useState(false);
	const [{ data, loading }] = ProductsApiHooks(
		`/${match.params.id}`
	);

	// const [noOfPrt, setNoOfParts] = useState(0);
	// const userName = getUserName();

	// const AddToCart = (e) => {
	// 	e.preventDefault();
	// 	if (noOfPrt > 10) {
	// 		toast.error(
	// 			` Please your portion cannot be greater than the available units which is ${10}`
	// 		);
	// 	} else {
	// 		// addItemToCart(data.item._id, noOfPrt);
	// 		// setOpen(false)
	// 	}
	// };

	useEffect(() => {
		// const getProductDetails = async () => {
		// 	setLoading(true);
		// 	try {
		// 		const res = await ProductsApi.get(`/search/details/${match.params.id}`);
		// 		setData(res.data);
		// 	} catch (error) {
		// 		setLoading(false);
		// 	}
		// };
		// getProductDetails();
	}, [match.params.id]);
	return (
		<>
			<div className={classes.root}>
				{loading ? <Media /> : <ProductsDetailsData data={data} />}
			</div>
		</>
	);
};

export default ProductDetails;
