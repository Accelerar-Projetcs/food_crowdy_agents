import React, { useState, useEffect, useRef, useContext } from 'react';
import { contextApi } from '../context/Context';
// import { agentApi, ProductsApi } from '../../server/Server';
import { getUserId } from '../../utils/localStore';
import PropTypes from 'prop-types';
import { category, state } from './data';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
// import Close from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {
	Card,
	CardHeader,
	CardContent,
	// CardActions`,
	Divider,
	Grid,
	Button,
	TextField
} from '@material-ui/core';
// import data from '../../views/Dashboard/components/LatestOrders/data';

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
	},
	Tooltip: {
		height: '2.2rem',
		width: '2.5rem',
		margin: '.4rem  0 0 0'
	},
	close: {
		float: 'right'
	}
}));

const AccountDetails = () => {
	const classes = useStyles();
	const agentId = getUserId();
	// const [farmerInfo, setFarmersInfo] = useState({
	// 	farmerName: '',
	// 	farmerLocation: '',
	// 	farmerDeal: ''
	// });
	const [open, setOpen] = useState(false);
	const [scroll, setScroll] = useState('paper');
	const [deal, setDeal] = useState([]);
	// const { dealTosend, setDealToSend } = useContext(contextApi);
	const [productDetails, setProductDetails] = useState({
		title: 'Bola',
		agentId: agentId,
		product: 'rice',
		price: 37,
		qty: 33,
		location: 'lagos',
		farmerName: 'mike',
		phoneNumber: '9829833ndj',
		videoURL: 'https://youtu.be/ewZX_EIs0Jc',
		uniqueId: null
	});
	const [imageFile, setImageFile] = useState('');
	// const [farmersDB, setFramersDb] = useState([]);
	// const [alert, setAlert] = useState(false);
	// const [loading, setLoading] = useState(false);
	const { dealDisplay, setDealDisplay } = useContext(contextApi);

	const handleChange = (key, value) => {
		setProductDetails({ ...productDetails, [key]: value });
	};

	// const getFarmersInfo = async (key, value) => {
	// 	try {
	// 		const res = await ProductsApi.get(`/farmers`);
	// 		if (res.data) {
	// 			setFarmersInfo(res.data);
	// 		} else {
	// 			setFarmersInfo({ ...setFarmersInfo, [key]: value });
	// 		}
	// 	} catch (error) {
	// 		setFarmersInfo({ ...setFarmersInfo, [key]: value });
	// 		setFramersDb([{ title: farmersDB[key] }]);
	// 		console.log(farmerInfo);
	// 	}
	// };

	const uploadProducts = (e) => {
		e.preventDefault();
		// setDeal();

		setDealDisplay([
			...dealDisplay,
			{
				id: Math.random(0, 300),
				farmerName: productDetails.farmerName,
				product: productDetails.product,
				price: productDetails.price,
				location: productDetails.location,
				qty: productDetails.qty
			}
		]);
		toast.success('Offer Added', {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000
		});
		// const data = new FormData();
		// data.append('title', productDetails.title);
		// data.append('agentId', productDetails.agentId);
		// data.append('product', productDetails.category);
		// data.append('description', productDetails.description);
		// data.append('price', productDetails.bulkPrice);
		// setDealToSend([...dealTosend, { data }]);
		// console.log(dealTosend);
		// console.log(...dealTosend);
		// localStorage.setItem('formData', data);
	};

	const handleClickOpen = (scrollType) => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const descriptionElementRef = useRef(null);
	useEffect(() => {}, []);
	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open, deal]);

	return (
		<div>
			<Tooltip
				onClick={handleClickOpen('paper')}
				className={classes.Tooltip}
				title='Add Another Deal'
				aria-label='add'>
				<Fab color='primary'>
					<AddIcon />
				</Fab>
			</Tooltip>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'>
				<DialogTitle id='scroll-dialog-title'>
					You are about to add a deal
				</DialogTitle>
				{/* <Close onClick={handleClose} className={classes.close} /> */}
				<DialogContent dividers={'scroll' === 'paper'}>
					<Grid container spacing={4}>
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
											label='Farmers Name'
											margin='dense'
											name='productTitle'
											onChange={(e) =>
												handleChange('farmerName', e.target.value)
											}
											// required
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											helperText='Please specify the first name'
											label='Product'
											margin='dense'
											name='video'
											onChange={(e) => handleChange('product', e.target.value)}
											// required
											type='text'
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label=''
											margin='dense'
											name='image'
											// required
											type='file'
											onChange={(e) => {
												setImageFile(e.target.files[0]);
												console.log(imageFile);
											}}
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
											// required
											// value={agentId}
											variant='outlined'
											disabled
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label='Phone Number'
											margin='dense'
											name='phoneNumber'
											onChange={handleChange}
											// required
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											className={classes.textField}
											id='outlined-select-state'
											select
											label='State'
											fullWidth
											name='State'
											// value={productDetails.product || ''}
											onChange={(e) => handleChange('product', e.target.value)}
											SelectProps={{
												native: true
											}}
											helperText='Please select your state'
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
											className={classes.textField}
											id='outlined-select-state'
											select
											label='loaction'
											fullWidth
											name='State'
											// value={productDetails.product || ''}
											onChange={(e) => handleChange('location', e.target.value)}
											SelectProps={{
												native: true
											}}
											helperText='Please select your state'
											variant='outlined'>
											{state.map((option) => (
												<option key={option.id} value={option.name}>
													{option.name}
												</option>
											))}
										</TextField>
									</Grid>{' '}
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label='Price'
											margin='dense'
											name='priceId'
											onChange={(e) => handleChange('price', e.target.value)}
											variant='outlined'
											// required
											type='number'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label='Qty'
											margin='dense'
											name='qty-id'
											onChange={(e) => handleChange('qty', e.target.value)}
											variant='outlined'
											// required
											type='number'
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
						</Card>
					</Grid>
					<DialogContentText
						id='scroll-dialog-description'
						ref={descriptionElementRef}
						tabIndex={-1}></DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={uploadProducts} color='primary' variant='contained'>
						ADD PRODUCT
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

AccountDetails.propTypes = {
	className: PropTypes.string
};

export default AccountDetails;
