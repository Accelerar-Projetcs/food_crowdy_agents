import React, { useState, useContext } from 'react';
import { agentApi } from '../../server/Server';
import { useCookies } from 'react-cookie';
import { saveUserDetails } from '../../utils/AuthToken';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab/';
import Footer from '../../layouts/Main/components/Footer/Footer';
import Minimal from '../../layouts/Minimal/Minimal';
import {
	Grid,
	Button,
	TextField,
	makeStyles,
	Typography,
	Link
} from '@material-ui/core';
import { contextApi } from '../../components/context/Context';
import { Style } from './Style';
import { errorHandler } from '../../errors/errorHandler';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => Style(theme));

const SignIn = (props) => {
	const { history } = props;
	const [, setCookie] = useCookies(['x-auth-token']);
	const { authUpdate, setauthUpdate } = useContext(contextApi);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState('');
	const [formState, setFormState] = useState({});
	const classes = useStyles();

	const handleChange = (event) => {
		event.persist();
		setFormState((formState) => ({
			...formState,
			[event.target.name]: event.target.value
		}));
	};

	const handleSignIn = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const res = await agentApi.post('/auth/login', formState);
			saveUserDetails(res.data);
			setCookie('x-auth-token', res.headers['x-auth-token']);
			setauthUpdate(!authUpdate);
			setLoading(false);
			history.push('/');
		} catch (error) {
			const errorMesssge = errorHandler(error);
			setMessage(errorMesssge);
			setLoading(false);
		}
	};

	return (
		<div className={classes.root}>
			<Minimal />
			<Grid className={classes.grid} container>
				<Grid className={classes.quoteContainer} item lg={5}>
					<img
						style={{
							borderRadius: '5%',
							height: '30rem',
							width: '30rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						src={`https://res.cloudinary.com/cmcwebcode/image/upload/v1596039761/foodcrowdy/signup_1_wovngn.jpg`}
						alt='Sign Up'
					/>
				</Grid>
				<Grid className={classes.content} item lg={7} xs={12}>
					<form className={classes.form} onSubmit={handleSignIn}>
						<Typography className={classes.title} variant='h2'>
							Sign in
						</Typography>
						{message && (
							<Alert variant='outlined' severity='error'>
								{message}
							</Alert>
						)}
						<Typography
							align='center'
							className={classes.sugestion}
							color='textSecondary'
							variant='body1'>
							login with email address
						</Typography>
						<TextField
							className={classes.textField}
							fullWidth
							required
							label='Email address'
							name='email'
							onChange={handleChange}
							type='text'
							value={formState.email || ''}
							variant='outlined'
						/>
						<TextField
							className={classes.textField}
							fullWidth
							required
							label='Password'
							name='password'
							onChange={handleChange}
							type='password'
							value={formState.password || ''}
							variant='outlined'
						/>
						<Button
							className={classes.signInButton}
							color='primary'
							disabled={loading ? true : false}
							fullWidth
							required
							size='large'
							type='submit'
							variant='contained'>
							Sign in now
						</Button>
						<Typography color='textPrimary' variant='body1'>
							Forgot Password?{' '}
							<Link
								className={classes.link}
								component={RouterLink}
								to='/forgot-password'
								variant='h6'>
								click here
							</Link>
						</Typography>
					</form>
				</Grid>
			</Grid>
			<Footer />
		</div>
	);
};

SignIn.propTypes = {
	history: PropTypes.object
};

export default SignIn;
