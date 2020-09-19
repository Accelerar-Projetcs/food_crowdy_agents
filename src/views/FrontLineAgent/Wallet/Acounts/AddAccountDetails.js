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
import { NigeriaBanks } from '../../../../utils/json/Banks';
import { errorHandler } from '../../../../errors/errorHandler';
import { agentApi } from '../../../../server/Server';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import Styles from './Style';
import { toast } from 'react-toastify';
import { addAcount } from './validator';

const useStyles = makeStyles((theme) => Styles(theme));

const AddAccountDetails = ({ setOpen, open }) => {
	const classes = useStyles();
	const [loader, setloader] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [requestData, setRequestData] = useState('');
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(addAcount)
	});
	const { headers } = useHeader();

	const handleClose = () => {
		setOpen(false);
	};

	const closeConfirm = () => {
		setConfirm(false);
	};

	const confirmData = (values) => {
		setRequestData(values);
		setConfirm(true);
	};

	const sendAccountDetails = async () => {
		setloader(true);
		setOpen(false);
		setConfirm(false);
		try {
			await agentApi.put(`/fla/bank-details`, requestData, {
				headers
			});
			toast.success(`Bank details successfully updated`);
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
						<CardHeader subheader='' title='Confirm Account Details' />
					</div>
					<Divider />
					<CardContent>
						<Alert severity='info'>
							<AlertTitle>Info</AlertTitle>
							Please sure your bank details are correctly inputed
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
					<form onSubmit={handleSubmit(confirmData)}>
						<div className={classes.close}>
							<CardHeader subheader='' title='Add Your Bank Details' />
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
								Please sure your bank details are correctly inputed
								<br />
							</Alert>
							<TextField
								className={classes.textField}
								fullWidth
								name='accountName'
								inputRef={register}
								helperText={
									errors && errors.accountName ? errors.accountName.message : ''
								}
								error={errors && errors.accountName ? true : false}
								type='text'
								variant='outlined'
							/>
							<TextField
								fullWidth
								className={classes.textField}
								name='bankName'
								select
								inputRef={register}
								helperText={
									errors && errors.bankName ? errors.bankName.message : ''
								}
								error={errors && errors.bankName ? true : false}
								SelectProps={{ native: true }}
								variant='outlined'>
								<option value=''> Choose Bank </option>
								{NigeriaBanks.map((option) => (
									<option key={option.id}>{option.name}</option>
								))}
							</TextField>
							<TextField
								className={classes.textField}
								fullWidth
								name='accountNumber'
								type='number'
								inputRef={register}
								helperText={
									errors && errors.accountNumber
										? errors.accountNumber.message
										: ''
								}
								error={errors && errors.accountNumber ? true : false}
								variant='outlined'
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
								Update
							</Button>
						</CardActions>
					</form>
				</Card>
			</Dialog>
		</div>
	);
};

export default AddAccountDetails;
