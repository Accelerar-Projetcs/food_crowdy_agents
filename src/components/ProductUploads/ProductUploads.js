import React, { useState, useEffect } from 'react';
import { agentApi, ProductsApi } from '../../server/Server';
import PropTypes from 'prop-types';
import { category, state } from './data';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField,
	List,
	ListItem,
	ListItemText,
	Paper
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {},
	cardDetails: {
		position: 'relative',
		width: '100%'
	},
	list: {
		position: 'absolute',
		background: '#fff',
		width: 'auto',
		margin: '3rem '
	}
}));

const AccountDetails = ({ userId }) => {
	// const { className, ...rest } = props;
	const classes = useStyles();
	const [farmerInfo, setFarmersInfo] = useState({
		farmerName: '',
		farmerLocation: '',
		farmerDeal: ''
	});
	const [productDetails, setProductDetails] = useState({
		title: ' ',
		agentId: userId,
		category: '',
		description: '',
		price: '',
		bulkPrice: '',
		maxDays: '',
		maxParticipants: '',
		discount: '',
		location: '',
		farmerName: '',
		farmerLocation: '',
		farmerDeal: ''
	});
	const [imageFile, setImageFile] = useState('');
	const [farmersDB, setFramersDb] = useState([
		{
			title: 'mr ali',
			id: 27,
			state: 'lagos'
		},
		{
			title: 'mr ali',
			id: 29,
			state: 'lagos'
		},
		{
			title: 'mr ali',
			id: 21,
			state: 'lagos'
		}
	]);
	// const [alert, setAlert] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleChange = (key, value) => {
		setProductDetails({ ...productDetails, [key]: value });
	};

	const getFarmersInfo = async (key, value) => {
		try {
			const res = await ProductsApi.get(`/farmers`);
			if (res.data) {
				setFarmersInfo(res.data);
			} else {
				setFarmersInfo({ ...setFarmersInfo, [key]: value });
			}
		} catch (error) {
			setFarmersInfo({ ...setFarmersInfo, [key]: value });
			setFramersDb([{ title: farmersDB[key] }]);
			console.log(farmerInfo);
		}

		// console.log(farmerInfo);
	};
	const uploadProducts = async (e) => {
		e.preventDefault();
		setLoading(true);
		const data = new FormData();
		data.append('title', productDetails.title);
		data.append('agentId', productDetails.agentId);
		data.append('category', productDetails.category);
		data.append('description', productDetails.description);
		data.append('price', productDetails.bulkPrice);
		data.append('price', productDetails.price);
		data.append('maxParticipants', productDetails.maxParticipants);
		data.append('maxDays', productDetails.maxDays);
		data.append('discount', productDetails.discount);
		data.append('farmerName', productDetails.farmerName);
		data.append('farmerLocation', productDetails.farmerLocation);
		data.append('location', productDetails.location);
		data.append('imageFile', imageFile);
		const headers = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		try {
			const res = await agentApi.post(
				`agent/myupload/create/${productDetails.agentId}`,
				productDetails,
				headers
			);
			setLoading(false);
			toast.success('product Uploaded succesfully', {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 20000
			});
			console.log(res);
		} catch (error) {
			setLoading(false);
			// setAlert(true);
			toast.error('There was a problem in uploading your product', {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 20000
			});
			console.log(error);
		}
	};

	const setFarmerDBQuery = (id) => {
		const data = farmersDB.filter((item) => (item.id === id ? item : ''));
		console.log(id);
		console.log(data);

		const farmerData = data[0];
		setFarmersInfo({
			farmerName: farmerData.title,
			farmerLocation: farmerData.state,
			farmerDeal: farmerData.id
		});
		console.log(farmerInfo);

		setProductDetails({
			// ...productDetails,
			farmerName: farmerData.title,
			farmerLocation: farmerData.state,
			farmerDeal: farmerData.id
		});
	};

	useEffect(() => {
		console.log('logging');
	}, []);

	return (
		<form autoComplete='off' noValidate onSubmit={uploadProducts}>
			<Grid container spacing={4}>
				<Grid item lg={4} md={6} xl={4} xs={12}>
					<Card>
						<CardHeader
							subheader='This infomations can be edited'
							title='Farmers Details'
						/>
						<Divider />
						<CardContent>
							<div className={classes.details}>
								<TextField
									fullWidth
									label='Farmers Name'
									margin='dense'
									name='farmerName'
									onChange={(e) => getFarmersInfo('farmerName', e.target.value)}
									value={
										farmersDB
											? farmerInfo.farmerName
											: productDetails.farmerName
									}
									variant='outlined'
								/>
								<Paper>
									<List
										className={classes.list}
										component='nav'
										aria-label='main mailbox folders'>
										{farmersDB &&
											farmersDB.map((list) => (
												<ListItem
													button
													key={list.id}
													onClick={() => setFarmerDBQuery(list.id)}>
													<ListItemText primary={list.title} />
												</ListItem>
											))}
									</List>
								</Paper>
								{/* <TextField
									fullWidth
									label='Farmer Loction'
									margin='dense'
									name='farmerLocation'
									onChange={(e) =>
										getFarmersInfo('farmerLocation', e.target.value)
									}
									value={
										farmersDB
											? farmerInfo.farmerLocation
											: productDetails.farmerLocation
									}
									variant='outlined'
								/>
								<TextField
									fullWidth
									label='Deal'
									margin='dense'
									name='farmerDeal'
									onChange={(e) => handleChange('farmerDeal', e.target.value)}
									value={
										farmersDB
											? farmerInfo.farmerDeal
											: productDetails.farmerDeal
									}
									variant='outlined'
								/> */}
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={8} md={6} xl={8} xs={12}>
					<Card>
						<CardHeader
							subheader='This infomations can be edited'
							title='Products Uploads'
						/>
						<Divider />
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										helperText='Please specify the first name'
										label='Title'
										margin='dense'
										name='productTitle'
										onChange={(e) => handleChange('title', e.target.value)}
										required
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label=''
										margin='dense'
										name='imageFile'
										required
										type='file'
										onChange={(e) => setImageFile(e.target.files[0])}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label='Agent id'
										margin='dense'
										name='agnetID'
										onChange={handleChange}
										required
										value={productDetails.agentId}
										variant='outlined'
										disabled
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										id='outlined-select-catergory-native'
										select
										fullWidth
										label='Category'
										value={productDetails.category}
										onChange={(e) => handleChange('category', e.target.value)}
										// helperText='Please select your currency'
										variant='outlined'>
										{category.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</TextField>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										id='outlined-select-location-native'
										select
										label='Location'
										fullWidth
										value={productDetails.location}
										onChange={(e) => handleChange('location', e.target.value)}
										// helperText='Please select your currency'
										variant='outlined'>
										{state.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</TextField>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label='Max days'
										margin='dense'
										name='maxDays'
										onChange={(e) => handleChange('maxDays', e.target.value)}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label='Price'
										margin='dense'
										name='priceId'
										onChange={(e) => handleChange('price', e.target.value)}
										variant='outlined'
										required
										type='number'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label='Bulk Price'
										margin='dense'
										name='bulk-price'
										onChange={(e) => handleChange('bulkPrice', e.target.value)}
										variant='outlined'
										required
										type='number'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label='Discount'
										margin='dense'
										name='discount-id'
										onChange={(e) => handleChange('discount', e.target.value)}
										variant='outlined'
										required
										type='number'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label='No of Parts'
										margin='dense'
										name='parts-id'
										onChange={(e) =>
											handleChange('maxParticipants', e.target.value)
										}
										variant='outlined'
										required
										type='number'
									/>
								</Grid>
							</Grid>
						</CardContent>
						<Divider />
						<CardActions>
							<Button
								// type='submit'
								onClick={() => console.log(productDetails)}
								disabled={loading ? true : false}
								variant='contained'
								fullWidth
								color='primary'>
								UPLOAD PRODUCT
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</form>
	);
};

AccountDetails.propTypes = {
	className: PropTypes.string
};

export default AccountDetails;
