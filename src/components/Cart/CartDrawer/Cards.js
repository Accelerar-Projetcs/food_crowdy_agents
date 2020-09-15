import React from 'react';
import {
	decrementCartItem,
	incrementCartItem,
	removeCartItem
} from '../../../Redux/Reducers/Cart/';
import { Delete as DeleteIcon, Add, Minimize } from '@material-ui/icons/';
import { Chip, Divider, Button ,makeStyles} from '@material-ui/core';
import { formatter } from '../../../utils/localStore';
import { Block as BlockIcon } from '@material-ui/icons';
import Style from './Style';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => Style(theme));
const CartMobile = ({ cartDisplay, dispatch }) => {
	const classes = useStyles();

	return (
		<div>
			<div className='mobile-cart'>
				<h3>My Cart({cartDisplay.length})</h3>
				<Divider />
				{cartDisplay.map((cart) => (
					<div className='mobile-card' key={cart.productId}>
						<div className='mobile-cart-grid'>
							<div className='block'>
								<img height='90' src={cart.image} alt={cart.title} />
							</div>
							<div className='block2'>
								<div className='head'>
									<div>
										<h5>{cart.title}</h5>
										<Chip size='small' label={cart.category} />
									</div>
									<div>
										{cart.isSoldOut ? (
											<Button
												variant='outlined'
												color='inherit'
												className={classes.button}
												fullWidth
												startIcon={<BlockIcon />}>
												Not Available
											</Button>
										) : (
											<div className='buttons'>
												<button
													onClick={() => {
														dispatch(incrementCartItem(cart.productId));
														toast.success(
															`Cart item successfully incremented by 1`,
															{ toastId: 'cart' }
														);
													}}>
													<Add />
												</button>
												<button
													onClick={() => {
														dispatch(decrementCartItem(cart.productId));
														toast.success(
															`Cart item successfully decremented by 1`,
															{ toastId: 'cart' }
														);
													}}>
													<Minimize />
												</button>
											</div>
										)}
									</div>
								</div>
								<p>
									Slots: <span>{cart.quantity}</span>
								</p>
								<p>
									Unit Price: <span>{formatter.format(cart.unitPrice)}</span>
								</p>
								<p>
									Total Price :
									<span>
										{formatter.format(cart.quantity * cart.unitPrice)}
									</span>
								</p>
							</div>
						</div>
						<div className='mobile-cart-bottom'>
							<Button
								variant='outlined'
								color='inherit'
								onClick={() => {
									dispatch(removeCartItem(cart.productId));
									toast.success(`1 item successfully removed from cart`, {
										toastId: 'cart'
									});
								}}
								size='small'
								className={classes.button}
								startIcon={<DeleteIcon />}>
								Remove
							</Button>
						</div>
					</div>
				))}
			</div>
			<Divider />
		</div>
	);
};

export default CartMobile;
