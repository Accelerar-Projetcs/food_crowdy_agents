import React, { useState } from 'react';
import {
	Button,
	CardContent,
	CardHeader,
	Divider,
	makeStyles,
	Typography,
	CardActions,
	FormGroup,
	FormControlLabel,
	Checkbox
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleBack,
	handleNext,
	getDetails
} from '../../../../Redux/Reducers/FLRegistration/index';
import ScrollTop from '../../../../ScrollToTop';
import Styles from '../Styles';

const useStyles = makeStyles((theme) => Styles(theme));

const ProfileDetails = () => {
	const classes = useStyles();
	const [state, setState] = useState({
		checkedB: true
	});
	const formState = useSelector((state) => state.FLRegistration.step);
	const activeStep = formState.activeStep;
	const dispatch = useDispatch();

	const handleChange = (event) => {
		setState({ [event.target.name]: event.target.checked });
	};

	const handleNextAction = () => {
		const number = activeStep + 1;

		dispatch(handleNext(number));
		dispatch(getDetails({ name: 'mike', age: 25 }));
	};

	const handleBackAction = () => {
		const number = activeStep - 1;
		dispatch(handleBack(number));
	};

	return (
		<form autoComplete='off' noValidate className={classes.root}>
			<ScrollTop />
			<div className={classes.Card}>
				<CardHeader
					className={classes.CardHeader}
					title={
						<Typography className={classes.text} variant='h5'>
							Agent Declaration
						</Typography>
					}
				/>
				<Divider />
				<CardContent>
					<p>
						I/We apply to be an Agent with FoodCrowdy. I/We understand that the
						information given herein and documents supplied on the basis of
						application is correct to the best of my knowledge.
					</p>
				</CardContent>
				<Divider />
				<CardActions>
					<FormGroup row>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.checkedB}
									onChange={handleChange}
									name='checkedB'
									color='primary'
								/>
							}
							label='Primary'
						/>
					</FormGroup>
					<Link color='primary' to='/terms-and-conditions'>
						Terms and conditions
					</Link>
				</CardActions>
				<div className={classes.buttons}>
					{activeStep !== 0 && (
						<Button onClick={handleBackAction} className={classes.button}>
							Back
						</Button>
					)}
					<Button
						variant='contained'
						color='primary'
						onClick={handleNextAction}
						className={classes.button}>
						{/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
						Continue
					</Button>
				</div>
			</div>
		</form>
	);
};

export default ProfileDetails;
