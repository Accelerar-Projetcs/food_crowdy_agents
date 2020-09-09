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
import { makeStyles } from '@material-ui/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Close as CloseIcon } from '@material-ui/icons';
import { addToCart } from '../../../../Redux/Reducers/Cart/';
import { contextApi } from '../../../../components/context/Context';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { CartStyles } from './Styles';

const useStyles = makeStyles((theme) => CartStyles(theme));

const AddToCartForm = ({ data, setOpen, open }) => {
	const [quantity, setQuantity] = useState(0);
	const { setCartState } = useContext(contextApi);
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleClose = () => {
		setOpen(false);
	};

	const AddToCart = (e) => {
		e.preventDefault()
		if (!quantity) {
		} else if (quantity > data.availableUnits) {
			toast.error(`Available slot is ${data.availableUnits}`, {
				toastId: 'add to cart error'
			});
		} else {
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
			handleClose();
			toast.success(`Item added to cart`);
		}
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
					</form>
				</Card>
			</Dialog>
		</div>
	);
};

export default AddToCartForm;
