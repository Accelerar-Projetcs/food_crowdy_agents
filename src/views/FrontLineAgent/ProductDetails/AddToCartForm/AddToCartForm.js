import React, { useState, useContext } from 'react';
import {
	Dialog,
	Card,
	CardHeader,
	CardActions,
	Button,
	Divider,
	IconButton,
	TextField,
	CardContent
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { addToCart } from '../../../../Redux/Reducers/Cart/';
// import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
// import { getPriceByLocation } from '../../utils/product/getUserLocationPrice';
import { CartStyles } from './Styles';
import { contextApi } from '../../../../components/context/Context';

const useStyles = makeStyles((theme) => CartStyles(theme));

const AddToCartForm = ({ data }) => {
	const [open, setOpen] = useState(true);
	const [quantity, setQuantity] = useState(0);
	const { setCartState } = useContext(contextApi);
	const dispatch = useDispatch();
  const classes = useStyles();
  

	const handleClose = () => {
		setOpen(false);
	};

	const AddToCart = (e) => {
		e.preventDefault();
		const item = {
			productId: data._id,
			image: data.imagePath,
			title: data.title,
			category: data.category,
			availableUnits: data.availableUnits,
			quantity: Math.abs(quantity),
			unitPrice: data.rebaseSellingPrice,
			totalPrice: Math.abs(quantity) * data.rebaseSellingPrice
		};
		dispatch(addToCart(item));
		setCartState({ right: true });
		// const unitPrice = getPriceByLocation(data);

		// if (!quantity) {
		// 	toast.error('Fill the number of slot needed', {
		// 		toastId: 'add to cart error'
		// 	});
		// } else if (quantity > data.numberOfUnits) {
		// 	toast.error(`Available slot is ${data.numberOfUnits}`, {
		// 		toastId: 'add to cart error'
		// 	});
		// } else {
		// 	// get unit price  by user agent location....
		// 	const item = {
		// 		productId: data._id.$oid,
		// 		image: data.imagePath,
		// 		title: data.title,
		// 		category: data.category,
		// 		quantity: Math.abs(1),
		// 		unitPrice: data.rebaseSellingPrice,
		// 		totalPrice: Math.abs(1) * data.rebaseSellingPrice
		// 	};
		// 	dispatch(addToCart(item));
		// 	setCartState({ right: true });
		// }
	};
	return (
		<div className={classes.root}>
			<Dialog
				className={classes.root}
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'>
				<Card>
					<form>
						<div className={classes.close}>
							<CardHeader subheader='' title='Choose Number of Slots' />
							<div>
								<IconButton aria-label='close' onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</div>
						</div>
						<Divider />

						<>
							<CardContent>
								<Alert severity='info'>
									<AlertTitle>Info</AlertTitle>
									Add item to your cart and make payments
									<br />
								</Alert>
								<TextField
									className={classes.textField}
									fullWidth
									name='noOfSlots'
									onChange={(e) => setQuantity(+e.target.value)}
									type='number'
									required
									variant='outlined'
								/>
							</CardContent>
							<Divider />
							<CardActions>
								<Button
									onClick={handleClose}
									variant='outlined'
									className={classes.btn}
									color='inherit'>
									CANCEL
								</Button>
								<Button
									onClick={AddToCart}
									type='submit'
									variant='contained'
									color='primary'>
									Add to cart
								</Button>
							</CardActions>
						</>
					</form>
				</Card>
			</Dialog>
		</div>
	);
};

export default AddToCartForm;
