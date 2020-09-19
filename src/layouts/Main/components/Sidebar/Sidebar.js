import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import {
	Dashboard as DashboardIcon,
	ShoppingBasket as ShoppingBasketIcon,
	AccountBox as AccountBoxIcon,
	Settings as SettingsIcon,
	ShopOutlined as ShowChartIcon,
	LineStyleOutlined as OrdersIcon,
	AccountBalanceWallet as WalletIcon
} from '@material-ui/icons/';

import { Profile, SidebarNav } from './components';
import { userData } from '../../../../utils/GetUserData';

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up('lg')]: {
			marginTop: 64,
			height: 'calc(100% - 64px)'
		}
	},
	root: {
		backgroundColor: theme.palette.white,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		padding: theme.spacing(2)
	},
	divider: {
		margin: theme.spacing(2, 0)
	},
	nav: {
		marginBottom: theme.spacing(2)
	}
}));

const Sidebar = (props) => {
	const { open, variant, onClose, className, ...rest } = props;
	const classes = useStyles();
	const userRole = userData('role');

	const BackLineAgent = [
		{
			title: 'Dashboard',
			href: '/',
			icon: <DashboardIcon />
		},
		{
			title: 'Products',
			href: '/products',
			icon: <ShoppingBasketIcon />
		},
		{
			title: 'Account',
			href: '/account',
			icon: <AccountBoxIcon />
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: <SettingsIcon />
		}
	];
	const FrontLine = [
		{
			title: 'Dashboard',
			href: '/',
			icon: <DashboardIcon />
		},
		{
			title: 'Shopping',
			href: '/agents/frontline/products',
			icon: <ShowChartIcon />
		},
		{
			title: 'Orders',
			href: '/agents/frontline/orders',
			icon: <OrdersIcon />
		},
		{
			title: 'Wallet',
			href: '/agents/frontline/wallet',
			icon: <WalletIcon />
		},
		// {
		// 	title: 'Account',
		// 	href: '/account',
		// 	icon: <AccountBoxIcon />
		// },
		{
			title: 'Settings',
			href: '/settings',
			icon: <SettingsIcon />
		}
	];
	const Marketers = [
		{
			title: 'Dashboard',
			href: '/',
			icon: <DashboardIcon />
		},
		// {
		// 	title: 'Account',
		// 	href: '/account',
		// 	icon: <AccountBoxIcon />
		// }
		{
			title: 'Settings',
			href: '/settings',
			icon: <SettingsIcon />
		}
	];
	const getRole = (roles) => {
		switch (roles) {
			case 'frontline':
				return FrontLine;
			case 'backline':
				return BackLineAgent;
			case 'marketer':
				return Marketers;
			default:
				return [];
		}
	};

	return (
		<Drawer
			anchor='left'
			classes={{ paper: classes.drawer }}
			onClose={onClose}
			open={open}
			variant={variant}>
			<div {...rest} className={clsx(classes.root, className)}>
				<Profile />
				<Divider className={classes.divider} />
				<SidebarNav className={classes.nav} pages={getRole(userRole)} />
			</div>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
};

export default Sidebar;
