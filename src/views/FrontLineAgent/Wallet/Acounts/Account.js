import React, { useState } from 'react';
import {
	Card,
	Grid,
	Avatar,
	Button,
	Typography,
	CardContent,
	makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/AccountBalance';
import AddAccountDetails from './AddAccountDetails';
import Style from './Style';

const useStyles = makeStyles((theme) => Style(theme));

const Account = ({ data }) => {
	const [open, setopen] = useState(false);
	const classes = useStyles();

	const openAccountForm = () => {
		setopen(true);
	};

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
							Account Details
						</Typography>
						{data.length ? (
							<>
								<Typography variant='h5'>{'0028292982'}</Typography>
								<Typography variant='h5'>{'Chinweike Michael C'}</Typography>
								<Typography variant='h5'>{'Zenith Bank PLC'}</Typography>
							</>
						) : (
							<Button
								variant={'contained'}
								color='secondary'
								size='small'
								onClick={openAccountForm}>
								Add Account
							</Button>
						)}
						<AddAccountDetails open={open} setOpen={setopen} />
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

export default Account;
