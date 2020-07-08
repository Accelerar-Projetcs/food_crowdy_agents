import React from 'react';
import UploadProducts from '../../../components/ProductUploads/ProductUploads';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	}
}));

const ProductUpload = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<UploadProducts />
		</div>
	);
};

export default ProductUpload;
