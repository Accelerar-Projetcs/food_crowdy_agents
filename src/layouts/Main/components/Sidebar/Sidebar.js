import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import People from '@material-ui/icons/People';
import Wallet from '@material-ui/icons/AccountBalanceWallet';
import { Profile, SidebarNav } from './components';
import { getRole as getAgentRoles } from '../../../../utils/localStore';

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
	const userRole = getAgentRoles();

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
			title: 'Add user',
			href: '/agents/frontline/products',
			icon: <People />
		},
		{
			title: 'Wallet',
			href: '/agents/frontline/wallet',
			icon: <Wallet />
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
	const Farmers = [
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
	const getRole = (roles) => {
		switch (roles) {
			case 'frontline':
				return FrontLine;
			case 'backline':
				return BackLineAgent;
			case 'Farmers':
				return Farmers;
			default:
				// BackLineAgent;
				// return BackLineAgent;
				return FrontLine;
				// return [];
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
