import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import PropType from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { agentApi } from '../../../server/Server';

const useStyles = makeStyles((theme) => ({
	root: {
		// backgroundColor: theme.palette.background.default,
		// height: '100%',
		// width: '100%'
	},
	grid: {
		height: '100%'
	},
	form: {
		margin: theme.spacing(4),
		'& > div': {
			margin: '1rem auto'
		}
	}
}));

const DeleteRequest = ({ match }) => {
	const [loadinggbtn, setLoadingbtn] = useState(false);

	const classes = useStyles();
	const [data, setData] = useState({});
	const [productDetails, setProductDetails] = useState({
		comment: ''
	});

	const handleChange = (key, value) => {
		setProductDetails({ ...productDetails, [key]: value });
	};

	const updateProduct = async (e) => {
		e.preventDefault();
		setLoadingbtn(true);
		console.log(productDetails);
		try {
			await agentApi.post(
				`agent/myupload/deleterequest/${match.params.id}`,
				productDetails
			);
			toast.success('request sent', {
				position: toast.POSITION.TOP_RIGHT
			});
		} catch (error) {
			setLoadingbtn(false);
			toast.error('Theres a problem sending your request', {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const res = await agentApi.get(
					`agent/myupload/deleterequest/${match.params.id}`
				);
				setData(res);
			} catch (error) {}
		})();
	}, [match]);

	return (
		<div className={classes.root}>
			<form onSubmit={updateProduct} className={classes.form}>
				<div>
					<Typography
						align='center'
						className={classes.sugestion}
						color='primary'
						variant='h5'>
						Make Delete Request
					</Typography>
				</div>
				<div>
					<Typography
						align='center'
						className={classes.sugestion}
						color='textSecondary'
						variant='body2'>
						{data.title}
					</Typography>
				</div>
				<div>
					<TextField
						className={classes.textField}
						id='standard-multiline-static'
						label='Write your comment'
						multiline
						rows={6}
						onChange={(e) => handleChange('comment', e.target.value)}
						type='text'
						value={productDetails.comment}
						variant='outlined'
					/>
				</div>
				<div>
					<Button
						className={classes.signInButton}
						color='primary'
						disabled={loadinggbtn ? true : false}
						size='large'
						type='submit'
						variant='contained'>
						MAKE REQUEST
					</Button>
				</div>
			</form>
		</div>
	);
};

DeleteRequest.PropType = {
	className: PropType.String
};

export default DeleteRequest;
