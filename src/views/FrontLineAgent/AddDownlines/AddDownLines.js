import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab/';
import { agentApi } from '../../../server/Server';
import BackDrop from '../../../components/BackDrop/BackDrop';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	TextField,
	Typography,
	Paper,
	Avatar
} from '@material-ui/core';
import Style from './Styles';
import ConfirmOTP from './ConfirmOTP';
import { errorHandler } from '../../../errors/errorHandler';

const useStyles = makeStyles((theme) => Style(theme));

const AddDownLines = () => {
	const classes = useStyles();
	const [phoneNumber, setphoneNumber] = useState('');
	const [mailCheck, setmailCheck] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setphoneNumber(event.target.value);
	};

	const sendOTP = async (e) => {
		e.preventDefault();
		setLoading(true);
		const data = {
			phoneNumber: `234${Number(phoneNumber)}`
		};

		try {
			await agentApi.post(`/fla/user-auth/generate-otp`, data);
			setmailCheck(true);
		} catch (error) {
			const errorMgs = errorHandler(error);
			setMessage(errorMgs);
		}
		setLoading(false);
	};

	return (
		<>

			<Paper className={classes.paper}>
				{loading && <BackDrop />}
				{mailCheck ? (
					<ConfirmOTP phoneNumber={phoneNumber} />
				) : (
					<Card className={classes.checkMail}>
						<Divider />
						<CardContent>
							{message && (
								<Alert variant='outlined' severity='error'>
									{message}
								</Alert>
							)}

							<CardHeader
								title={<Typography variant='h3'> Add DownLine</Typography>}
							/>

							<Divider />
							<div>
								<Avatar
									// style={{ textAlign: 'center' }}
									className={classes.avatar}
									src={'/wepowewe/qwioqwi'}
								/>
							</div>
							<CardContent>
								<span>Enter the phone of the downline you want to add</span>
								<form onSubmit={sendOTP}>
									<TextField
										fullWidth
										label='Phone Number'
										name='phoneNumber'
										onChange={handleChange}
										style={{ marginTop: '1rem' }}
										type='number'
										variant='outlined'
										required
									/>
									<Button
										className={classes.btn}
										color='primary'
										type='submit'
										fullWidth
										disabled={loading ? true : false}
										variant='contained'>
										Proceed
									</Button>
								</form>
							</CardContent>
							<Divider />
						</CardContent>
					</Card>
				)}
			</Paper>
		</>
	);
};

export default AddDownLines;
