import React, { useState, useContext } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleNext } from '../../../../Redux/Reducers/FLRegistration/index';
import BackDrop from '../../../../components/BackDrop/BackDrop';
import ScrollTop from '../../../../ScrollToTop';
import queryString from 'query-string';
import Styles from '../Styles';
import { errorHandler } from '../../../../errors/errorHandler';
import { agentApi } from '../../../../server/Server';
import { toast } from 'react-toastify';
import { contextApi } from '../../../../components/context/Context';

const useStyles = makeStyles((theme) => Styles(theme));

const Declaration = () => {
	const classes = useStyles();
	const [state, setState] = useState({ acceptPolicy: false });
	const { imageFile } = useContext(contextApi);
	const [loading, setLoading] = useState(false);
	const formState = useSelector((state) => state.FLRegistration);
	const registrationForm = formState.form;
	const activeStep = formState.step.activeStep;
	const dispatch = useDispatch();
	const location = useLocation();

	const handleChange = (event) => {
		setState({ [event.target.name]: event.target.checked });
	};

	const SubmitForm = async () => {
		const number = activeStep + 1;
		const referralId = queryString.parse(location.search).referralId || null;

		if (state.acceptPolicy && referralId) {
			const {
				files: { file }
			} = imageFile;

			const {
				lga,
				bvn,
				city,
				state,
				email,
				gender,
				address,
				lastName,
				business,
				guarantor,
				nextOfKin,
				firstName,
				phoneNumber,
				otherNames,
				nationality,
				relationship,
				stateOfOrigin,
				identification
			} = registrationForm;

			setLoading(true);
			const formData = new FormData();
			formData.append('lga', lga);
			formData.append('bvn', bvn);
			formData.append('city', city);
			formData.append('image', file);
			formData.append('state', state);
			formData.append('email', email);
			formData.append('gender', gender);
			formData.append('address', address);
			formData.append('lastName', lastName);
			formData.append('firstName', firstName);
			formData.append('otherNames', otherNames);
			formData.append('referralId', referralId);
			formData.append('nationality', nationality);
			formData.append('phoneNumber', phoneNumber);
			formData.append('relationship', relationship);
			formData.append('stateOfOrigin', stateOfOrigin);
			formData.append('business', JSON.stringify(business));
			formData.append('guarantor', JSON.stringify(guarantor));
			formData.append('nextOfKin', JSON.stringify(nextOfKin));
			formData.append('identification', JSON.stringify(identification));
			try {
				await agentApi.post(`/auth/signup-frontline-agent`, formData);
				setLoading(false);
				dispatch(handleNext(number));
			} catch (error) {
				errorHandler(error);
			}
			setLoading(false);
		} else {
			toast.error('something went wrong');
		}
	};

	return (
		<form autoComplete='off' noValidate className={classes.root}>
			{loading && <BackDrop />}
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
									onChange={handleChange}
									name='acceptPolicy'
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
					<Button
						variant='contained'
						color='primary'
						onClick={SubmitForm}
						className={classes.button}>
						Finish
					</Button>
				</div>
			</div>
		</form>
	);
};

export default Declaration;
