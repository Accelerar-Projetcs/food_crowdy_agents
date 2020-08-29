import React, { useState, useEffect, useContext } from 'react';
import { contextApi } from '../context/Context';
import { ProductsApi } from '../../server/Server';
import { getUserId } from '../../utils/localStore';
import PropTypes from 'prop-types';
import { category } from '../../utils/ProductsCategory';
import state from '../../utils/LocationList';
import { makeStyles } from '@material-ui/styles';
import { Styles } from './styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import {
	Card,
	Fab,
	Tooltip,
	CardHeader,
	CardContent,
	Divider,
	Grid,
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	// DialogContentText,
	// CircularProgress,
	DialogTitle
} from '@material-ui/core';
import BackDrop from '../../components/BackDrop/BackDrop';
import { toast } from 'react-toastify';

/**
 *  implementing React FilePond
 *  */
import { FilePond } from 'react-filepond';

const useStyles = makeStyles((theme) => Styles(theme));

const AccountDetails = () => {
	const classes = useStyles();
	const agentId = getUserId();
	const history = useHistory();
	const { loading, setLoading } = useContext(contextApi);
	const [open, setOpen] = useState(false);
	const [alert] = useState(false);
	const [scroll, setScroll] = useState('paper');
	const [deal] = useState([]);
	const [loader, setloader] = useState(false);
	const [imageFile, setImageFile] = useState({ files: '' });
	const [productDetails, setProductDetails] = useState({
		farmerId: null,
		agentId
	});
	const handleChange = (key, value) => {
		setProductDetails({ ...productDetails, [key]: value });
	};

	const getFarmersInfo = async (key, value) => {
		handleChange('farmerName', value);
		// try {
		// 	// const res = await ProductsApi.get(`/search/farmerss?name=${value}`);
		// 	// console.log(res);
		// 	if (res.data.length) {
		// 		setProductDetails({
		// 			farmerName: res.data[0].name,
		// 			farmerId: res.data[0].uniqueId,
		// 			location: res.data[0].location
		// 		});
		// 		setloader('farmer already exists');
		// 	} else {
		// 		handleChange('farmerName', value);
		// 	}
		// } catch (error) {
		// 	setProductDetails({
		// 		farmerName: value
		// 	});
		// }
		// setloader(false);
	};

	const uploadProducts = async (e) => {
		e.preventDefault();
		// if (Object.keys(productDetails).length !== 8) return setAlert(true);
		// if (!dealDisplay.length) {
		// 	return toast.warning('You have not added any offer yet', {
		// 		position: toast.POSITION.TOP_RIGHT,
		// 		autoClose: 5000
		// 	});
		// }
		handleClose();
		setloader(true);
		try {
			const data = new FormData();
			data.append('farmName', productDetails.farmerName);
			data.append('title', productDetails.title);
			data.append('agentId', agentId);
			data.append('farmerId', productDetails.farmerId || null);
			data.append('deal', productDetails.deal);
			data.append('agentPriceOffer', productDetails.price);
			data.append('phoneNumber', productDetails.phoneNumber);
			data.append('quantity', productDetails.qty);
			data.append('location', productDetails.location);
			data.append('image', imageFile.files);
			data.append('videoURL', productDetails.videoURL);
			await ProductsApi.post(`/createuploadrequest/${agentId}`, data);
			toast.success('your deal has been  successfully uploaded', {
				toastId: '4334'
			});
			setLoading(!loading);
			history.push('/products');
		} catch (error) {
			toast.error('problem uploading offer try again', { toastId: 'we32493' });
		}
		setloader(false);
	};

	const handleClickOpen = (scrollType) => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {}, [open, deal]);

	return (
		<div className={classes.root}>
			{loader && <BackDrop text='uploading your offer please wait...' />}
			<form>
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
					className={classes.scroll}
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
								<CardHeader title='Products Uploads' />
								<Divider />
								<CardContent>
									{alert && (
										<Alert color='error'>
											<AlertTitle>
												Please all field are required inorder to proceed to the
												next step
											</AlertTitle>
										</Alert>
									)}

									<Grid container spacing={3}>
										<Grid item md={6} xs={12}>
											<TextField
												className={classes.textField}
												fullWidth
												// helperText={loading !== '' ? { loading } : ''}
												label='Farmers Name'
												name='productTitle'
												value={productDetails.farmerName || ''}
												onChange={(e) => {
													handleChange('farmerName', e.target.value);
													getFarmersInfo('title', e.target.value);
												}}
												required
												variant='outlined'
											/>
											<TextField
												className={classes.textField}
												id='outlined-select-state'
												select
												label='loaction'
												fullWidth
												name='State'
												required
												onChange={(e) =>
													handleChange('location', e.target.value)
												}
												SelectProps={{
													native: true
												}}
												variant='outlined'>
												{state.map((option) => (
													<option key={option.id} value={option.name}>
														{option.name}
													</option>
												))}
											</TextField>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												className={classes.textField}
												fullWidth
												label='title'
												name='title-id'
												onChange={(e) => {
													handleChange('title', e.target.value);
												}}
												required
												variant='outlined'
											/>
											<TextField
												className={classes.textField}
												id='outlined-select-state'
												select
												label='Product'
												fullWidth
												name='product-id'
												// value={productDetails.product || ''}
												onChange={(e) => handleChange('deal', e.target.value)}
												SelectProps={{
													native: true
												}}
												variant='outlined'>
												{category.map((option) => (
													<option key={option.value} value={option.value}>
														{option.value}
													</option>
												))}
											</TextField>
										</Grid>
										<Grid item md={12} xs={12}>
											<Grid container spacing={2}>
												<Grid item md={6} xs={12}>
													<TextField
														className={classes.textField}
														fullWidth
														label='Phone Number'
														name='phoneNumber'
														onChange={(e) =>
															handleChange('phoneNumber', e.target.value)
														}
														required
														variant='outlined'
													/>
												</Grid>
												<Grid item md={6} xs={12}>
													<TextField
														className={classes.textField}
														fullWidth
														label='Video Link'
														name='videoURL'
														required
														type='text'
														onChange={(e) =>
															handleChange('videoURL', e.target.value)
														}
														variant='outlined'
													/>
												</Grid>
											</Grid>
										</Grid>
										<Grid item md={12} xs={12}>
											<FilePond
												// files={imageFile}
												allowMultiple={true}
												maxFiles={1}
												name={'file'}
												required={true}
												allowFileSizeValidation={true}
												maxTotalFileSize={10485760}
												labelMaxTotalFileSize={
													'Total file size should be lesser than 5MB.'
												}
												allowFileTypeValidation={true}
												acceptedFileTypes={['image/jpeg']}
												fileValidateTypeLabelExpectedTypesMap={{
													// 'application/pdf': '.pdf',
													'image/jpeg': '.jpg'
												}}
												labelFileTypeNotAllowed={
													'Upload only PDF or JPEG file.'
												}
												onremovefile={(file) => {
													setImageFile('');
												}}
												onupdatefiles={(fileItems) => {
													setImageFile({
														files: fileItems[0].file
													});
												}}
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												className={classes.textField}
												fullWidth
												label='Price'
												name='priceId'
												onChange={(e) => handleChange('price', e.target.value)}
												variant='outlined'
												// required
												type='number'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												className={classes.textField}
												fullWidth
												label='Qty'
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
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='primary'>
							CANCEL
						</Button>
						<Button
							type='submit'
							onClick={uploadProducts}
							color='primary'
							variant='contained'>
							ADD PRODUCT
						</Button>
					</DialogActions>
				</Dialog>
			</form>
		</div>
	);
};

AccountDetails.propTypes = {
	className: PropTypes.string
};

export default AccountDetails;
