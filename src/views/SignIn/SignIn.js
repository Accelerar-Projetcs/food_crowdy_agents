import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { agentUser } from '../../server/Server';
import { saveAuthToken, saveUserDetails } from '../../utils/AuthToken';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab/';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import Footer from '../../layouts/Main/components/Footer/Footer';
import Minimal from '../../layouts/Minimal/Minimal';
import {
	Grid,
	Button,
	IconButton,
	TextField,
	Link,
	Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
		length: {
			maximum: 64
		}
	},
	password: {
		presence: {
			allowEmpty: false,
			message: 'is required',
			message2: 'password must be minimum of 7 characters'
		},
		length: {
			maximum: 128,
			minimun: 6
		}
	}
};

const useStyles = makeStyles((theme) => ({
	root: {
		// height: '100%'
	},
	grid: {
		// height: '100%'
	},
	quoteContainer: {
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},
	quote: {
		backgroundColor: theme.palette.neutral,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage: 'url(https://res.cloudinary.com/cmcwebcode/image/upload/v1596039761/foodcrowdy/signup_1_wovngn.jpg)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	},
	quoteInner: {
		textAlign: 'center',
		flexBasis: '600px'
	},
	quoteText: {
		color: theme.palette.white,
		fontWeight: 300
	},
	name: {
		marginTop: theme.spacing(3),
		color: theme.palette.white
	},
	bio: {
		color: theme.palette.white
	},
	contentContainer: {},
	content: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	contentHeader: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: theme.spacing(5),
		paddingBototm: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	logoImage: {
		marginLeft: theme.spacing(4)
	},
	contentBody: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'center'
		}
	},
	form: {
		paddingLeft: 100,
		paddingRight: 100,
		paddingBottom: 125,
		flexBasis: 700,
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		}
	},
	title: {
		marginTop: theme.spacing(3)
	},
	socialButtons: {
		marginTop: theme.spacing(3)
	},
	socialIcon: {
		marginRight: theme.spacing(1)
	},
	sugestion: {
		marginTop: theme.spacing(2),
		textAlign: 'left'
	},
	textField: {
		marginTop: theme.spacing(2)
	},
	signInButton: {
		margin: theme.spacing(2, 0)
	}
}));

const SignIn = (props) => {
	const { history } = props;

	const classes = useStyles();
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState('');
	const [formState, setFormState] = useState({
		isValid: false,
		values: {},
		touched: {},
		errors: {}
	});

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((formState) => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	const handleBack = () => {
		history.goBack();
	};

	const handleChange = (event) => {
		event.persist();

		setFormState((formState) => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]: event.target.value
			},
			touched: {
				...formState.touched,
				[event.target.name]: true
			}
		}));
	};

	const handleSignIn = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const res = await agentUser.post('/signin', formState.values);
			saveUserDetails(res.data.validUser);
			saveAuthToken(res.data.token);
			if (res.status === 200) {
				history.push('/');
			}
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

	const hasError = (field) =>
		formState.touched[field] && formState.errors[field] ? true : false;
	return (
		<div className={classes.root}>
			<Minimal />
			<Grid className={classes.grid} container>
				<Grid className={classes.quoteContainer} item lg={5}>
					<div className={classes.quote}>
						<div className={classes.quoteInner}>
							<Typography className={classes.quoteText} variant='h5'>
								Hello Agent, <br />
								You Make Passive Income by Bringing Great Deals
							</Typography>
							<div className={classes.person}>
								<Typography className={classes.name} variant='body1'>
									FoodCrowdy Agents
								</Typography>
							</div>
						</div>
					</div>
				</Grid>
				<Grid className={classes.content} item lg={7} xs={12}>
					<div className={classes.content}>
						<div className={classes.contentHeader}>
							<IconButton onClick={handleBack}>
								<ArrowBackIcon />
							</IconButton>
						</div>
						<div className={classes.contentBody}>
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
									error={hasError('email')}
									fullWidth
									helperText={
										hasError('email') ? formState.errors.email[0] : null
									}
									label='Email address'
									name='email'
									onChange={handleChange}
									type='text'
									value={formState.values.email || ''}
									variant='outlined'
								/>
								<TextField
									className={classes.textField}
									error={hasError('password')}
									fullWidth
									helperText={
										hasError('password') ? formState.errors.password[0] : null
									}
									label='Password'
									name='password'
									onChange={handleChange}
									type='password'
									value={formState.values.password || ''}
									variant='outlined'
								/>
								<Button
									className={classes.signInButton}
									color='primary'
									// disabled={!formState.isValid}
									disabled={loading ? true : false}
									fullWidth
									size='large'
									type='submit'
									variant='contained'>
									Sign in now
								</Button>
								<Typography color='textSecondary' variant='body1'>
									Don't have an account?{' '}
									<Link component={RouterLink} to='/sign-up' variant='h6'>
										Sign up
									</Link>
								</Typography>
							</form>
						</div>
					</div>
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
