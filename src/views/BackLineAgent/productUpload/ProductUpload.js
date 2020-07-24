import React from 'react';
import UploadProducts from '../../../components/ProductUploadForm/ProductUploads';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
		minHeight: '100%'
	}
}));

const ProductUpload = ({ history }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<UploadProducts history={history} />
		</div>
	);
};

export default ProductUpload;
