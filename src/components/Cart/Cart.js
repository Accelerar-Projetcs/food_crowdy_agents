import React, { useState, useEffect } from 'react';
import { formatter } from '../../utils/localStore';
import { useDispatch, useSelector } from 'react-redux';
import MobileCartView from './CartDrawer/Cards';
import { Link } from 'react-router-dom';
import { IconButton, Button } from '@material-ui/core/';
import { Close } from '@material-ui/icons';
import ProgressBar from '../LoadingCenter/LoadingCenter';
import cartImage from '../../assets/images/commerce.png';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	btn: {
		margin: theme.spacing(1, 0)
	}
}));

export default function Cart({ toggleDrawer }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [loading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const cart = useSelector((state) => state.Cart.cart);

	useEffect(() => {
		console.log(cart);
		if (cart.length) {
			const totalAmount = cart.reduce((a, b) => a + b.totalPrice, 0);
			setTotalPrice(totalAmount);
		}
	}, [cart]);

	return (
		<div className={'cart'}>
			<IconButton
				aria-label='close'
				className={'close-cart'}
				onClick={toggleDrawer}>
				<Close />
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
					<Link onClick={toggleDrawer} to={`/products/all`}>
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
							<Link to={`/agents/frontline/products`}>
								<Button
									className={classes.btn}
									onClick={toggleDrawer}
									variant='outlined'
									// size='medium'
									color='inherit'>
									<strong>CONTINUE SHOPPING</strong>
								</Button>
							</Link>
							<Link to={`/agents/frontline/choose-downline`}>
								<Button
									onClick={toggleDrawer}
									className={classes.btn}
									variant='contained'
									// size='medium'
									color='primary'>
									<strong>PROCEED TO CHECKOUT</strong>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
