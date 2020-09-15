import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ContactPhone from '../../../assets/images/contact.svg';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	TextField,
	Typography,
	Paper
} from '@material-ui/core';
import Style from './Styles';
import DownLineForm from './DownLineForm';
import { Alert } from '@material-ui/lab';
import { agentApi } from '../../../server/Server';
import { errorHandler } from '../../../errors/errorHandler';

const useStyles = makeStyles((theme) => Style(theme));

const AddDownLines = ({ phoneNumber }) => {
	const classes = useStyles();
	const [code, setCode] = useState('');
	const [register, setregister] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setCode(event.target.value);
	};

	const sendPasswordResetLink = async (e) => {
		e.preventDefault();
		setLoading(true);
		const data = {
			phoneNumber: `234${Number(phoneNumber)}`,
			code
		};
		console.log(data);
		try {
			const res = await agentApi.post(
				`fla/user-auth/verify-otp
			`,
				data
			);
			console.log(res);
			setregister(true);
		} catch (error) {
			const errorMessage = errorHandler(error);
			setMessage(errorMessage);
		}
		setLoading(false);
	};

	const resendOTP = () => {
		window.location.reload(false);
	};

	return (
		<Paper className={classes.paper}>
			{register && <DownLineForm />}
			<Card className={classes.checkMail}>
				<CardHeader
					title={<Typography variant='h3'> Verify User OTP</Typography>}
				/>
				<Divider />
				<CardContent>
					<div>
						<img
							style={{ margin: '0 auto' }}
							src={ContactPhone}
							alt='Reset Password'
							height='50'
						/>
					</div>
					{message && (
						<div>
							<span>
								<Alert color='error'>{message}</Alert>
							</span>
						</div>
					)}
					<div>
						<span>
							Enter the <strong>OTP</strong> sent to this number{' '}
							<strong>{phoneNumber}</strong>
						</span>
						<br />
						<form onSubmit={sendPasswordResetLink}>
							<TextField
								fullWidth
								label='Enter OTP Code'
								name='code'
								onChange={handleChange}
								style={{ marginTop: '1rem' }}
								type='number'
								variant='outlined'
								required
							/>
							<Button
								className={classes.btn}
								color='primary'
								fullWidth
								type='submit'
								disabled={loading ? true : false}
								variant='contained'>
								Proceed
							</Button>
						</form>
						<span>
							Didn't get an OTP
							<Button onClick={resendOTP} variant='text' color='primary'>
								Resend
							</Button>
						</span>
					</div>
				</CardContent>
			</Card>
		</Paper>
	);
};

export default AddDownLines;
