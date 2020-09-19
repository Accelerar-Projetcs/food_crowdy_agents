import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import BalanceHistory from './BalanceHistory/';
import FundWallet from './FundWallet';
import WalletHistory from './WalletHistory/';
import Account from './Acounts/Account';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	}
}));

const Wallet = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<BalanceHistory />
				</Grid>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<Account data={[]} />
				</Grid>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<FundWallet />
				</Grid>
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<WalletHistory />
				</Grid>
			</Grid>
		</div>
	);
};

export default Wallet;
