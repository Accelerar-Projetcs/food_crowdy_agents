import React, { useState } from 'react';
import { Alert } from '@material-ui/lab/';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	TextField,
	Paper,
	makeStyles
} from '@material-ui/core';
import { agentApi } from '../../server/Server';
import ScrollToTop from '../../ScrollToTop/index';
import BackDrop from '../../components/BackDrop/BackDrop';
import Footer from '../../layouts/Main/components/Footer/Footer';
import Minimal from '../../layouts/Minimal/Minimal';
import mailer from '../../assets/images/mailer.svg';
import { errorHandler } from '../../errors/errorHandler';
import Style from './Style';

const useStyles = makeStyles((theme) => Style(theme));

const Password = () => {
	const classes = useStyles();
	const [email, setemail] = useState('');
	const [checkMail, setCheckMail] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setemail(event.target.value);
	};

	const sendPasswordResetLink = async (e) => {
		e.preventDefault();
		setLoading(true);
		setCheckMail(true);
		try {
			await agentApi.post(`/auth/forgotten-password`, { email });
			setCheckMail(true);
		} catch (error) {
			const errorMgs = errorHandler(error);
			setMessage(errorMgs);
		}
		setLoading(false);
	};

	return (
		<>
			<Minimal>
				<Paper className={classes.paper}>
					<ScrollToTop />
					{loading && <BackDrop />}
					{checkMail ? (
						<Card className={classes.checkMail}>
							<CardHeader title='Check Your Mail' />
							<Divider />
							<CardContent>
								<img src={mailer} alt='Reset Password' />
								<div>
									<span>
										Check your email we have sent you a link for password reset
									</span>
									<br />
									<span>
										Didn't get a mail
										<Button
											onClick={() => setCheckMail(false)}
											variant='text'
											color='primary'>
											Resend
										</Button>
									</span>
								</div>
							</CardContent>
							3
						</Card>
					) : (
						<Card>
							<Divider />
							<CardContent>
								{message && (
									<Alert variant='outlined' severity='error'>
										{message}
									</Alert>
								)}
								<CardHeader title='Password Recovery' />
								<Divider />
								<CardContent>
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
											color='secondary'
											type='submit'
											disabled={loading ? true : false}
											variant='contained'>
											Reset Password
										</Button>
									</form>
								</CardContent>
								<Divider />
							</CardContent>
						</Card>
					)}
				</Paper>
			</Minimal>
			<Footer />
		</>
	);
};

export default Password;
