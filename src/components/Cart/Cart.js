import React, { useState, useEffect } from 'react';
import { formatter } from '../../utils/localStore';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MobileCartView from './CartDrawer/Cards';
import { IconButton, Button } from '@material-ui/core/';
import { ArrowForward } from '@material-ui/icons';
import ProgressBar from '../LoadingCenter/LoadingCenter';
import cartImage from '../../assets/images/commerce.png';
import { makeStyles } from '@material-ui/styles';
import { saveCartItemInLocalStore } from '../../Redux/Reducers/Cart/localStorage';

const useStyles = makeStyles((theme) => ({
	btn: {
		margin: theme.spacing(1, 0.5)
	}
}));

export default function Cart({ toggleDrawer }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [loading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const cart = useSelector((state) => state.Cart.cart);

	useEffect(() => {
		if (cart.length) {
			const newCart = cart.map((item) => ({
				...item,
				totalPrice: item.quantity * item.unitPrice
			}));
			saveCartItemInLocalStore(newCart);
			const totalAmount = newCart.reduce((a, b) => a + b.totalPrice, 0);
			setTotalPrice(totalAmount);
		}
	}, [cart]);

	return (
		<div className={'cart'}>
			<IconButton
				aria-label='close'
				className={'close-cart'}
				onClick={toggleDrawer}>
				<ArrowForward />
			</IconButton>
			{!cart.length ? (
				<div className='cart-empty'>
					<h3>CART</h3>
					<div className='cart-empty-img'>
						{loading ? (
							<ProgressBar />
						) : (
							<>
								<img src={cartImage} alt='no cart available' />
								<p>
									<strong>Your cart is empty</strong>
								</p>
								<p>Browse our categories and discover our best deals!</p>
							</>
						)}
					</div>
					<Link onClick={toggleDrawer} to={`/agents/frontline/products`}>
						<Button variant='contained' size='large' color='primary'>
							<strong>{loading ? 'LOADING CART' : 'START SHOPPING'}</strong>
						</Button>
					</Link>
				</div>
			) : (
				<div>
					<MobileCartView cartDisplay={cart} dispatch={dispatch} />
					<div className='cart-checkout'>
						<div className='cart-checkout-total'>
							{loading ? (
								<ProgressBar />
							) : (
								<span>TOTAL PRICE : {formatter.format(totalPrice)}</span>
							)}
						</div>
						<div className='cart-checkout-btn'>
							<Button
								href={`/agents/frontline/products`}
								className={classes.btn}
								onClick={toggleDrawer}
								variant='outlined'
								color='default'>
								<strong>CONTINUE SHOPPING</strong>
							</Button>
							<Button
								onClick={toggleDrawer}
								className={classes.btn}
								variant='contained'
								href={`/agents/frontline/choose-downline`}
								color='primary'>
								<strong>PROCEED TO CHECKOUT</strong>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
