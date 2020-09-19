import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import RequestWithDrawal from './RequestWithdrawal';
import AllRequest from './AllRequest/AllRequest';

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
		marginTop: theme.spacing(1),
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
		background: theme.palette.success.main,
		'&:hover': {
			backgroundColor: theme.palette.success.dark
		}
	},
	btnmore: {
		textTransform: 'capitalize',
		fontSize: '.8rem',
		textDecoration: 'underline'
	}
}));

const FundWallet = () => {
	const classes = useStyles();
	const [open, setopen] = useState(false);
	const [openList, setopenList] = useState(false);
	const handleOpen = () => {
		setopen(true);
	};
	const handleOpenList = () => {
		setopenList(true);
	};
	return (
		<>
			<Card className={classes.root}>
				<CardContent>
					<Grid container justify='space-between'>
						<Grid item>
							<Typography
								className={classes.title}
								color='textSecondary'
								gutterBottom
								variant='body2'>
								Withdrawal
							</Typography>
							<Button
								onClick={handleOpen}
								className={classes.btn}
								variant='contained'
								color='inherit'>
								Withdrawal
							</Button>
							<RequestWithDrawal open={open} setOpen={setopen} />
						</Grid>
					</Grid>
					<div className={classes.difference}>
						<Button
							className={classes.btnmore}
							size={'small'}
							color='primary'
							onClick={handleOpenList}
							variant='text'>
							See all request
						</Button>
						<AllRequest open={openList} setOpen={setopenList} />
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default FundWallet;
