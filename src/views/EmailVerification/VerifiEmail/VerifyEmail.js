import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab/';
// import BackDrop from '../../components/backdrop/Backdrop';
import mailer from '../../../assets/images/mailer.svg';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	TextField,
	Typography
} from '@material-ui/core';
import Style from '../Styles/Styles';
import { contextApi } from '../../../components/context/Context';

const useStyles = makeStyles((theme) => Style(theme));

const Password = () => {
	const classes = useStyles();
	const [email, setemail] = useState('');
	const { mailCheck, setmailCheck } = useContext(contextApi);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setemail(event.target.value);
	};

	const sendPasswordResetLink = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await (`/forgot`, { email });
			setmailCheck(true);
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
		<div className={classes.paper}>
			{/* {loading && <BackDrop load={true} />} */}
			{mailCheck ? (
				<Card className={classes.checkMail}>
					<CardHeader
						title={<Typography variant='h3'> Verify Your Account</Typography>}
					/>
					<Divider />
					<CardContent>
						<div>
							<img style={{margin:'0 auto'}} src={mailer} alt='Reset Password' />
						</div>
						<div>
							<span>
								Check your email we have sent you a link for account verification
							</span>
							<br />
							<span>
								Didn't get a mail
								<Button
									onClick={() => setmailCheck(false)}
									variant='text'
									color='primary'>
									Resend
								</Button>
							</span>
						</div>
					</CardContent>
				</Card>
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
							title={<Typography variant='h3'> Verify Your Account</Typography>}
						/>
						<Divider />
						<CardContent>
							<span>
								Enter your email so you can get a link to verify your account
							</span>
							<form onSubmit={sendPasswordResetLink}>
								<TextField
									fullWidth
									label='Enter Your Email'
									name='email'
									onChange={handleChange}
									style={{ marginTop: '1rem' }}
									type='email'
									variant='filled'
									required
								/>
								<Button
									className={classes.btn}
									color='primary'
									type='submit'
									disabled={loading ? true : false}
									variant='contained'>
									Verify 
								</Button>
							</form>
						</CardContent>
						<Divider />
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Password;
