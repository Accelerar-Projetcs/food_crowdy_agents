import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { agentUser } from '../../server/Server';
import { saveAuthToken, saveUserDetails } from '../../utils/AuthToken';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab/';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
	Grid,
	Button,
	IconButton,
	TextField,
	Link,
	Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// // import { Facebook as FacebookIcon, Google as GoogleIcon } from '@material-ui/icons';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import GoogleIcon from '@material-ui/icons/GroupOutlined';
// import FaceBook from '@material-ui/icons/Facebook';

const schema = {
	email: {
		// presence: { allowEmpty: false, message: 'is required' },
		email: true,
		length: {
			maximum: 64
		}
	},
	username: {
		presence: true,
		exclusion: {
			within: ['nicklas'],
			message: "'%{value}' is not allowed"
		}
	},
	password: {
		presence: {
			allowEmpty: false,
			// message: 'is required',
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
		backgroundColor: theme.palette.background.default,
		height: '100%'
	},
	grid: {
		height: '100%'
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
		backgroundImage: 'url(https://source.unsplash.com/random)',
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
	const { history, location } = props;

	const classes = useStyles();
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState('');
	const [formState, setFormState] = useState({
		isValid: false,
		values: {
			// name: 'John M',
			// email: 'thiweyhtopwekekn@gmail.com',
			// password: 'mike123',
			// phoneNumber: '0993893899388',
			role: 'backline'
		},
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
				[event.target.name]:
					event.target.type === 'checkbox' ? event.target.value : ''
			},
			touched: {
				...formState.touched,
				[event.target.name]: true
			}
		}));
	};

	const handleSignIn = async (event) => {
		event.preventDefault();
		setLoading(!loading);
		console.log(formState);
		try {
			const res = await agentUser.post('/signup', formState.values);
			console.log(formState.values);
			saveUserDetails(res.data.newUser);
			saveAuthToken(res.data.token);
			console.log(res);

			if (location && location.state) {
				history.replace(location.state.pathname);
			} else {
				history.replace('/');
			}
		} catch (error) {
			const { response } = error;
			console.log({ error });
			if (response === undefined) {
				setMessage(error.message);
			} else if (response.data) {
				setMessage(response.data.message);
			}
			setLoading(false);
		}
	};

	const hasError = (field) =>
		formState.touched[field] && formState.errors[field] ? true : false;

	return (
		<div className={classes.root}>
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
								{/* <Typography className={classes.bio} variant='body2'>
									Manager at inVision
								</Typography> */}
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
									Sign Up
								</Typography>
								{/* <Typography color='textSecondary' gutterBottom>
									Sign in with social media
								</Typography> */}
								{/* <Grid className={classes.socialButtons} container spacing={2}>
									<Grid item>
										<Button
											color='primary'
											onClick={handleSignIn}
											size='large'
											variant='contained'>
											<FacebookIcon className={classes.socialIcon} />
											Login with Facebook
										</Button>
									</Grid>
									<Grid item>
										<Button
											onClick={handleSignIn}
											size='large'
											variant='contained'>
											<GoogleIcon className={classes.socialIcon} />
											Login with Google
										</Button>
									</Grid>
								</Grid> */}
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
									Create Account with your email address
								</Typography>
								<TextField
									className={classes.textField}
									error={hasError('email')}
									fullWidth
									helperText={
										hasError('userName') ? formState.errors.username[0] : null
									}
									label='Name'
									name='userName'
									onChange={handleChange}
									type='text'
									// value={formState.values.userName || ''}
									variant='outlined'
								/>
								<TextField
									className={classes.textField}
									// error={hasError('email')}
									fullWidth
									// helperText={
									// 	hasError('email') ? formState.errors.email[0] : null
									// }
									label='Email address'
									name='email'
									onChange={handleChange}
									type='text'
									// value={formState.values.email || ''}
									variant='outlined'
								/>
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
									// value={formState.values.email || ''}
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
									// value={formState.values.password || ''}
									variant='outlined'
								/>
								{/* <TextField
									className={classes.textField}
									fullWidth
									select
									label='role'
									name='agent-role'
									onChange={handleChange}
									// required
									value={formState.values.role}
									variant='outlined'>
									{['frontline', 'backline', 'farmer Vendor'].map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</TextField> */}
								<Button
									className={classes.signInButton}
									color='primary'
									// disabled={!formState.isValid}
									fullWidth
									size='large'
									type='submit'
									variant='contained'>
									SignUp in now
								</Button>
								<Typography color='textSecondary' variant='body1'>
									have an account?{' '}
									<Link component={RouterLink} to='/sign-in' variant='h6'>
										Sign In
									</Link>
								</Typography>
							</form>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

SignIn.propTypes = {
	history: PropTypes.object
};

export default withRouter(SignIn);