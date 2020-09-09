import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	AppBar,
	Toolbar,
	Badge,
	Hidden,
	IconButton,
	makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import clsx from 'clsx';
import Logo from '../../../../assets/images/logoFood.svg';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { contextApi } from '../../../../components/context/Context';

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: 'none'
	},
	flexGrow: {
		flexGrow: 1
	},
	header: {
		color: theme.palette.white,
		margin: theme.spacing(0, 2)
	},
	signOutButton: {
		marginLeft: theme.spacing(1)
	}
}));

const Topbar = (props) => {
	const { className, onSidebarOpen, ...rest } = props;
	const { setCartState } = useContext(contextApi);
	const cart = useSelector((state) => state.Cart.cart);
	const [cookies, removeCookie] = useCookies(['x-auth-token']);
	const classes = useStyles();
	const history = useHistory();

	const logoutOutUser = () => {;
		localStorage.clear();
		removeCookie('x-auth-token', { path: '/' });
		if (!cookies['x-auth-token']) {
			history.push('/sign-in');
		}
	};

	const openCart = () => setCartState({ right: true });

	return (
		<AppBar {...rest} className={clsx(classes.root, className)}>
			<Toolbar>
				<RouterLink to='/'>
					<img alt='food Crowdy agent' height='60' src={Logo} />
				</RouterLink>
				<h3 className={classes.header}>AGENTS DASHBOARD</h3>
				<div className={classes.flexGrow} />

				<IconButton onClick={openCart} color='inherit'>
					<Badge
						badgeContent={cart.length}
						color='secondary'
						variant='standard'>
						<ShoppingCartOutlined />
					</Badge>
				</IconButton>
				<Hidden mdDown>
					<IconButton
						onClick={logoutOutUser}
						className={classes.signOutButton}
						color='inherit'>
						<InputIcon />
					</IconButton>
				</Hidden>
				<Hidden lgUp>
					<IconButton color='inherit' onClick={onSidebarOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

Topbar.propTypes = {
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func
};

export default Topbar;
