import React, { useState, useEffect, useRef, useContext } from 'react';
import { contextApi } from '../context/Context';
import { ProductsApi } from '../../server/Server';
import { getUserId } from '../../utils/localStore';
import PropTypes from 'prop-types';
import { category, state } from './data';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import { Styles } from './styles';
import { Alert, AlertTitle } from '@material-ui/lab';
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
	DialogContentText,
	CircularProgress,
	DialogTitle
} from '@material-ui/core';

/**
 *  implementing React FilePond
 *  */
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

// filepond plugin registration
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const useStyles = makeStyles((theme) => Styles(theme));

const AccountDetails = () => {
	const classes = useStyles();
	const agentId = getUserId();
	const [open, setOpen] = useState(false);
	const [alert, setAlert] = useState(false);
	const [scroll, setScroll] = useState('paper');
	const [deal] = useState([]);
	const [loading, setLoading] = useState('');
	const [imageFile, setImageFile] = useState({ files: '' });
	const { dealDisplay, setDealDisplay } = useContext(contextApi);
	const [productDetails, setProductDetails] = useState({
		// farmerName: 'Bola',
		// farmerId: ,
		// title: ,
		// deal: 'yam',
		// price: 3000,
		// agentId: agentId,
		// location: 'lagos',
		// qty: 37,
		// videoURL: 'https://youtu.be/ewZX_EIs0Jc'
	});
	const handleChange = (key, value) => {
		setProductDetails({ ...productDetails, [key]: value });
	};

	const getFarmersInfo = async (key, value) => {
		try {
			const res = await ProductsApi.get(`/farmers?name=${value}`);
			if (res.data.length) {
				setProductDetails({
					farmerName: res.data[0].name,
					farmerId: res.data[0].uniqueId,
					location: res.data[0].location
				});
				setLoading('farmer already exists');
			} else {
				handleChange('farmerName', value);
			}
		} catch (error) {
			setProductDetails({
				farmerName: value
			});
		}
		setLoading(false);
	};
	
	const uploadProducts = async (e) => {
		e.preventDefault();
		if (!Object.keys(productDetails).length !== 9) return setAlert(true);
		setDealDisplay([
			...dealDisplay,
			{
				id: Math.random(0, 300),
				title: productDetails.title,
				farmerName: productDetails.farmerName,
				farmerId: productDetails.farmerId,
				deal: productDetails.deal,
				price: productDetails.price,
				agentId: agentId,
				location: productDetails.location,
				qty: productDetails.qty,
				file: imageFile.files,
				videoURL: productDetails.videoURL
			}
		]);
		toast.success('Offer Added');
		handleClose();
	};

	const handleClickOpen = (scrollType) => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const descriptionElementRef = useRef(null);
	useEffect(() => {
		// if (open) {
		// 	const { current: descriptionElement } = descriptionElementRef;
		// 	if (descriptionElement !== null) {
		// 		descriptionElement.focus();
		// 	}
		// }
	}, [open, deal]);

	return (
		<div className={classes.root}>
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
								<CardHeader
									subheader='This infomations can be edited'
									title='Products Uploads'
								/>
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
												// margin='dense'
												name='productTitle'
												value={productDetails.farmerName || ''}
												onChange={(e) => {
													handleChange('farmerName', e.target.value);
													getFarmersInfo('title', e.target.value);
												}}
												// required
												variant='outlined'
											/>
											{loading && <CircularProgress color='primary' />}
											<TextField
												className={classes.textField}
												className={classes.textField}
												id='outlined-select-state'
												select
												label='loaction'
												fullWidth
												name='State'
												// value={productDetails.product || ''}
												onChange={(e) =>
													handleChange('location', e.target.value)
												}
												SelectProps={{
													native: true
												}}
												// helperText='Please select your state'
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
												// helperText='Please specify the first name'
												label='title'
												// margin='dense'
												name='title-id'
												onChange={(e) => {
													handleChange('title', e.target.value);
												}}
												// required
												variant='outlined'
											/>

											<TextField
												className={classes.textField}
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
												// helperText='Please select your state'
												variant='outlined'>
												{category.map((option) => (
													<option key={option} value={option}>
														{option}
													</option>
												))}
											</TextField>
										</Grid>
										<Grid item md={6} xs={12}>
											<>
												<TextField
													className={classes.textField}
													fullWidth
													label='Phone Number'
													// margin='dense'
													name='phoneNumber'
													onChange={handleChange}
													// required
													variant='outlined'
												/>
												<FilePond
													// files={imageFile}
													allowMultiple={true}
													maxFiles={1}
													onupdatefiles={(fileItems) => {
														setImageFile({
															files: fileItems[0].file
														});
													}}
												/>
											</>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												className={classes.textField}
												fullWidth
												label='Video Link'
												// margin='dense'
												name='videoURL'
												// required
												type='text'
												onChange={(e) =>
													handleChange('videoURL', e.target.value)
												}
												variant='outlined'
											/>
											<TextField
												className={classes.textField}
												fullWidth
												label='Agent id'
												// margin='dense'
												name='agentId'
												// onChange={handleChange}
												value={agentId}
												variant='outlined'
												disabled
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												className={classes.textField}
												fullWidth
												label='Price'
												// margin='dense'
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
												// margin='dense'
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
						{/* <DialogContentText
							id='scroll-dialog-description'
							// ref={descriptionElementRef}
							tabIndex={-1}></DialogContentText> */}
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
