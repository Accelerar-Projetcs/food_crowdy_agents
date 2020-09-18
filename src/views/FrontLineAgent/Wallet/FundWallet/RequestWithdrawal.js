import React, { useState } from 'react';
import {
	Dialog,
	Card,
	CardHeader,
	CardActions,
	Button,
	Divider,
	IconButton,
	TextField,
	makeStyles,
	CardContent
} from '@material-ui/core';
import BackDropLoader from '../../../../components/BackDrop/BackDrop';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Close as CloseIcon } from '@material-ui/icons';
import useHeader from '../../../../server/Headers';
import { errorHandler } from '../../../../errors/errorHandler';
import { agentApi } from '../../../../server/Server';
import { toast } from 'react-toastify';
import Styles from './Style';

const useStyles = makeStyles((theme) => Styles(theme));

const RequestWithDrawal = ({ setOpen, open }) => {
	const classes = useStyles();
	const [loader, setloader] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [amount, setamount] = useState(0);
	const [requestData, setRequestData] = useState('');

	const { headers } = useHeader();

	const handleClose = () => {
		setOpen(false);
	};

	const closeConfirm = () => {
		setConfirm(false);
	};

	const confirmData = (e) => {
		e.preventDefault();
		setRequestData({ amount });
		setConfirm(true);
	};

	const sendAccountDetails = async () => {
		setloader(true);
		setOpen(false);
		setConfirm(false);
		try {
			await agentApi.post(`/wallet/request-withdrawal`, requestData, {
				headers
			});
			toast.success(`Your withdrawal request has been succesfully`);
		} catch (error) {
			errorHandler(error);
			setOpen(true);
		}
		setloader(false);
	};

	const ConfirmData = (
		<Dialog
			className={classes.root}
			open={confirm}
			aria-labelledby='form-dialog-title'>
			<Card>
				<form>
					<div className={classes.close}>
						<CardHeader title='Make Withdrawal' />
					</div>
					<Divider />
					<CardContent>
						<Alert severity='info'>
							<AlertTitle>Info</AlertTitle>
							Please be sure you want to makwe this request
							<br />
						</Alert>
					</CardContent>
					<Divider />
					<CardActions>
						<Button
							onClick={closeConfirm}
							variant='outlined'
							className={classes.btn}
							color='inherit'>
							CANCEL
						</Button>
						<Button
							onClick={sendAccountDetails}
							type='submit'
							variant='contained'
							color='primary'>
							Update
						</Button>
					</CardActions>
				</form>
			</Card>
		</Dialog>
	);

	return (
		<div className={classes.root}>
			{loader && <BackDropLoader />}
			{confirm && ConfirmData}
			<Dialog
				className={classes.root}
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'>
				<Card>
					<form onSubmit={confirmData}>
						<div className={classes.close}>
							<CardHeader subheader='' title='Enter Request Amount' />
							<div>
								<IconButton aria-label='close' onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</div>
						</div>
						<Divider />
						<CardContent>
							<Alert severity='info'>
								<AlertTitle>Info</AlertTitle>
								Enter the amount you wish to withdraw
								<br />
							</Alert>
							<TextField
								className={classes.textField}
								fullWidth
								name='amount'
								onChange={(e) => setamount(e.target.value)}
								type='number'
								variant='outlined'
								required
							/>
						</CardContent>
						<Divider />
						<CardActions>
							<Button
								onClick={handleClose}
								variant='outlined'
								className={classes.btn}
								color='inherit'>
								CANCEL
							</Button>
							<Button type='submit' variant='contained' color='primary'>
								SUBMIT
							</Button>
						</CardActions>
					</form>
				</Card>
			</Dialog>
		</div>
	);
};

export default RequestWithDrawal;
