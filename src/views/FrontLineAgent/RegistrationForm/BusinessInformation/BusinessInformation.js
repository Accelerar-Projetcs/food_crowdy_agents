import React  from 'react';
import {
	Button,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	makeStyles,
	Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import {
	handleNext,
	getDetails
} from '../../../../Redux/Reducers/FLRegistration/index';
import ScrollTop from '../../../../ScrollToTop';
import Styles from '../Styles';
import { BusinessInfoSchema } from '../Validators';

const useStyles = makeStyles((theme) => Styles(theme));

const ProfileDetails = () => {
	const classes = useStyles();
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(BusinessInfoSchema)
	});
	const formState = useSelector((state) => state.FLRegistration.step);
	const activeStep = formState.activeStep;
	const dispatch = useDispatch();

	const handleNextAction = () => {
		const number = activeStep + 1;

		dispatch(handleNext(number));
		dispatch(getDetails({ name: 'mike', age: 25 }));
	};


	return (
		<form onSubmit={handleSubmit(handleNextAction)} className={classes.root}>
			<ScrollTop />
			<div className={classes.Card}>
				<CardHeader
					className={classes.CardHeader}
					title={
						<div>
							<Typography className={classes.text} variant='h5'>
								Business Information
							</Typography>
							<Typography className={classes.text} variant='caption'>
								Please complete this form to proceed with your registration
							</Typography>
						</div>
					}
				/>
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Business Name'
								name='businessName'
								variant='outlined'
								inputRef={register}
								helperText={
									errors && errors.businessName
										? errors.businessName.message
										: ''
								}
								error={errors && errors.businessName ? true : false}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Business Phone Number'
								name='businessPhoneNumber'
								variant='outlined'
								inputRef={register}
								helperText={
									errors && errors.businessPhoneNumber
										? errors.businessPhoneNumber.message
										: ''
								}
								error={errors && errors.businessPhoneNumber ? true : false}
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								label='Business Type'
								name='businessType'
								select
								SelectProps={{ native: true }}
								variant='outlined'
								inputRef={register}
								helperText={
									errors && errors.businessType
										? errors.businessType.message
										: ''
								}
								error={errors && errors.businessType ? true : false}>
								{[
									'Nationa ID',
									'International Passport',
									'Drivers License',
									'INEC Voters Card'
								].map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								label='Business Address'
								name='businessAddress'
								variant='outlined'
								multiline
								rows={5}
								inputRef={register}
								helperText={
									errors && errors.businessAddress
										? errors.businessAddress.message
										: ''
								}
								error={errors && errors.businessAddress ? true : false}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='State'
								name='businessState'
								select
								SelectProps={{ native: true }}
								variant='outlined'
								inputRef={register}
								helperText={
									errors && errors.businessState
										? errors.businessState.message
										: ''
								}
								error={errors && errors.businessState ? true : false}>
								{['Male', 'Females'].map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</Grid>

						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='L.G.A'
								name='businessLGA'
								select
								SelectProps={{ native: true }}
								variant='outlined'
								inputRef={register}
								helperText={
									errors && errors.businessLGA ? errors.businessLGA.message : ''
								}
								error={errors && errors.businessLGA ? true : false}>
								{['Male', 'Females'].map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='City'
								name='businessCity'
								select
								SelectProps={{ native: true }}
								variant='outlined'
								inputRef={register}
								helperText={
									errors && errors.businessCity
										? errors.businessCity.message
										: ''
								}
								error={errors && errors.businessCity ? true : false}>
								{['Male', 'Females'].map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='House/Store Number'
								name='storeNumber'
								variant='outlined'
								inputRef={register}
								helperText={
									errors && errors.storeNumber ? errors.storeNumber.message : ''
								}
								error={errors && errors.storeNumber ? true : false}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<div className={classes.buttons}>
					<Button
						variant='contained'
						color='primary'
						type='submit'
						className={classes.button}>
						Continue
					</Button>
				</div>
			</div>
		</form>
	);
};

export default ProfileDetails;
