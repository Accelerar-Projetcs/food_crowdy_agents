import React, { useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab/';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	TextField
} from '@material-ui/core';
import Style from './Style';
import BackDrop from '../../../components/BackDrop/BackDrop';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { agentApi } from '../../../server/Server';
import { errorHandler } from '../../../errors/errorHandler';
import { saveUserDetails } from '../../../utils/AuthToken';
import { useHistory } from 'react-router-dom';
import { contextApi } from '../../../components/context/Context';

const useStyles = makeStyles((theme) => Style(theme));

const Password = ({ location }) => {
	const classes = useStyles();
	const [loading, setloading] = useState(false);
	const [cookies, setCookie] = useCookies(['x-auth-token']);
	const { authUpdate, setauthUpdate } = useContext(contextApi);
	const [message, setMessage] = useState('');
	const [password, setPassword] = useState('');
	const [error, seterror] = useState('');
	const [confirmPassword, setconfirmPassowrd] = useState('');
	const history = useHistory();

	const handleChange = (event) => {
		const passwordStrength = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
		if (!event.target.value.match(passwordStrength)) {
			seterror(' password strength is too weak');
		} else {
			seterror('');
		}
		setPassword(event.target.value);
	};

	const updatePassword = async (e) => {
		e.preventDefault();
		const resetId = queryString.parse(location.search).token || null;
		if (password !== confirmPassword) {
			return toast.error(`Please your password doest not match`, {
				toastId: 'wrong'
			});
		}
		setloading(true);
		if (resetId) {
			const data = {
				token: resetId,
				password
			};
			try {
				const res = await agentApi.post(`/auth/change-password`, data);
				saveUserDetails(res.data);
				setCookie('x-auth-token', res.headers['x-auth-token']);
				setauthUpdate(!authUpdate);
				setloading(false);
				history.push(`/`);
			} catch (error) {
				const errorMgs = errorHandler(error);
				setMessage(errorMgs);
				setloading(false);
			}
		}
		setloading(false);
	};

	const checkPasswordMatch = (e) => {
		setconfirmPassowrd(e.target.value);
		if (password === e.target.value) {
			setMessage('');
		} else {
			setMessage('Password does not match');
		}
	};

	return (
		<Card className={classes.card}>
			<CardHeader title='Create Password' />
			{loading && <BackDrop load={true} />}
			<Divider />
			<CardContent>
				<CardContent>
					{message && (
						<Alert variant='outlined' severity='error'>
							{message}
						</Alert>
					)}
					<form className={classes.card} onSubmit={updatePassword}>
						<TextField
							label='Password'
							name='password'
							fullWidth
							error={error ? true : false}
							helperText={error}
							onChange={handleChange}
							className={classes.textField}
							type='password'
							variant='filled'
							required
						/>

						<TextField
							label='Confirm Password'
							fullWidth
							name='confirmPassword'
							value={confirmPassword}
							onChange={checkPasswordMatch}
							className={classes.textField}
							type='password'
							required
							variant='filled'
						/>
						<div>
							<Button
								className={classes.textField}
								color='secondary'
								type='submit'
								fullWidth
								disabled={loading ? true : false}
								variant='contained'>
								Submit
							</Button>
						</div>
					</form>
				</CardContent>
				<Divider />
			</CardContent>
		</Card>
	);
};

export default Password;
