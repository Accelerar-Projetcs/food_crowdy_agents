import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardContent,
	Grid,
	Typography,
	Button
} from '@material-ui/core';
import ArrowUpWard from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%'
	},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	title: {
		fontWeight: 700
	},
	avatar: {
		backgroundColor: theme.palette.success.main,
		height: 56,
		width: 56
	},
	icon: {
		height: 32,
		width: 32
	},
	difference: {
		marginTop: theme.spacing(2),
		display: 'flex',
		alignItems: 'center'
	},
	differenceIcon: {
		color: theme.palette.error.dark
	},
	differenceValue: {
		color: theme.palette.error.dark,
		marginRight: theme.spacing(1)
	},
	btn: {
		color: theme.palette.white,
		background: theme.palette.success.main
	}
}));

const FundWallet = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid container justify='space-between'>
					<Grid item>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
							variant='body2'>
							Fund Your Wallet
						</Typography>
						<Button className={classes.btn} variant='contained' color='inherit'>
							Fund Wallet
						</Button>
					</Grid>
				</Grid>
				<div className={classes.difference}>
					<ArrowUpWard className={classes.differenceIcon} />
					<Typography className={classes.differenceValue} variant='body2'>
						12%
					</Typography>
					<Typography className={classes.caption} variant='caption'>
						Since last month
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
};

export default FundWallet;
