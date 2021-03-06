import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardContent,
	Grid,
	Typography,
	Avatar,
	// Chip
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import useAgent from '../../../../hooks/useAgent';
import useHeader from '../../../../server/Headers';
import { formatter } from '../../../../utils/localStore';

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
		backgroundColor: theme.palette.tetiary.main,
		height: 56,
		width: 56
	},
	icon: {
		height: 32,
		width: 32
	}
}));

const BalanceHistory = () => {
	const classes = useStyles();
	const { headers } = useHeader();
	const { data } = useAgent(`/wallet/balance`, headers);

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
							Wallet Balance
						</Typography>
						<Typography variant='h3'>
							{formatter.format((data && data.balance) || 0)}
						</Typography>
						{/* <Chip color='primary' label='coming soon' /> */}
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<MoneyIcon className={classes.icon} />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default BalanceHistory;
