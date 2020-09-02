import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
// import { Alert } from '@material-ui/lab/';
// import BackDrop from '../../components/backdrop/Backdrop';
import ContactPhone from '../../../assets/images/contact.svg';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	TextField,
	Typography
} from '@material-ui/core';
import Style from './Styles';
import DownLineForm from './DownLineForm';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => Style(theme));

const AddDownLines = () => {
	const classes = useStyles();
	const [email, setemail] = useState('');
	const [register, setregister] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setemail(event.target.value);
	};

	const sendPasswordResetLink = async (e) => {
		e.preventDefault();
		setLoading(true);
		setregister(true);
		try {
			await (`/forgot`, { email });
			setregister(true);
		} catch (error) {
			const { response } = error;
			if (response === undefined) {
				setMessage(error.message);
			} else if (response.data) {
				setMessage(response.data.message);
			}
		}
		setLoading(false);
	};

	return (
		<>
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
							<strong>+2348165084064</strong>
						</span>
						<br />
						<form onSubmit={sendPasswordResetLink}>
							<TextField
								fullWidth
								label='Phone Number'
								name='email'
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
								disabled={loading ? true : false}
								variant='contained'>
								Proceed
							</Button>
						</form>
						<span>
							Didn't get a mail
							<Button
								onClick={() => setregister(false)}
								variant='text'
								color='primary'>
								Resend
							</Button>
						</span>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default AddDownLines;
