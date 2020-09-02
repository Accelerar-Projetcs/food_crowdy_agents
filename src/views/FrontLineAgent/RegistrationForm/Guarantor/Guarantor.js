import React from 'react';
import {
	Button,
	CardContent,
	CardHeader,
	CardActions,
	Divider,
	Grid,
	TextField,
	makeStyles,
	Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleBack,
	handleNext,
	getDetails
} from '../../../../Redux/Reducers/FLRegistration/index';
import { GuarantorInfoSchema } from '../Validators/';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import ScrollTop from '../../../../ScrollToTop';
import Styles from '../Styles';

const useStyles = makeStyles((theme) => Styles(theme));

const ProfileDetails = () => {
	const classes = useStyles();
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(GuarantorInfoSchema)
	});
	const formState = useSelector((state) => state.FLRegistration.step);
	const activeStep = formState.activeStep;
	const dispatch = useDispatch();


	const handleNextAction = (data) => {
		const number = activeStep + 1;
		dispatch(handleNext(number));
		dispatch(getDetails(data));
	};

	const handleBackAction = () => {
		const number = activeStep - 1;
		dispatch(handleBack(number));
	};

	return (
		<>
			<ScrollTop />
			<div className={classes.Card}>
				<CardHeader
					className={classes.CardHeader}
					title={
						<div>
							<Typography className={classes.text} variant='h5'>
								Guarantors information
							</Typography>
							<Typography className={classes.text} variant='caption'>
								Please complete this form to proceed with your registration
							</Typography>
						</div>
					}
				/>
				<Divider />
				<form
					onSubmit={handleSubmit(handleNextAction)}
					className={classes.root}>
					<CardContent>
						<Grid container spacing={3}>
							<Grid item md={6} xs={12}>
								<TextField
									className={classes.textField}
									fullWidth
									label='Surname '
									name='guarantorSurName'
									type='text'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorSurName
											? errors.guarantorSurName.message.toLowerCase()
											: ''
									}
									error={errors && errors.guarantorSurName ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='First name'
									name='guarantorFirstName'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorFirstName
											? errors.guarantorFirstName.message.toLowerCase()
											: ''
									}
									error={errors && errors.guarantorFirstName ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Other Names'
									name='guarantorOtherNames'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorOtherNames
											? errors.guarantorOtherNames.message.toLowerCase()
											: ''
									}
									error={errors && errors.guarantorOtherNames ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Email Address'
									name='quarantorEmail'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.quarantorEmail
											? errors.quarantorEmail.message.toLowerCase()
											: ''
									}
									error={errors && errors.quarantorEmail ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Phone Number'
									name='guarantorPhoneNumber'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorPhoneNumber
											? errors.guarantorPhoneNumber.message.toLowerCase()
											: ''
									}
									error={errors && errors.guarantorPhoneNumber ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Occupation'
									name='guarantorOccupation'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorOccupation
											? errors.guarantorOccupation.message.toLowerCase()
											: ''
									}
									error={errors && errors.guarantorOccupation ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Gender'
									name='quarantorGender'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.quarantorGender
											? errors.quarantorGender.message.toLowerCase()
											: ''
									}
									error={errors && errors.quarantorGender ? true : false}>
									{['Male', 'Female'].map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Relationship'
									name='guarantorRelationship'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorRelationship
											? errors.guarantorRelationship.message.toLowerCase()
											: ''
									}
									error={errors && errors.guarantorRelationship ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Nationality'
									name='guarantorNationality'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorNationality
											? errors.guarantorNationality.message.toLowerCase()
											: ''
									}
									error={errors && errors.guarantorNationality ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='State of origin'
									name='guarantorStateOfOrigin'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorStateOfOrigin
											? errors.guarantorStateOfOrigin.message.toLowerCase()
											: ''
									}
									error={
										errors && errors.guarantorStateOfOrigin ? true : false
									}>
									{['Abia', 'Imo'].map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									fullWidth
									label='City/Town'
									name='guarantorCity'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.guarantorCity
											? errors.guarantorCity.message.toLowerCase()
											: ''
									}
									error={errors && errors.guarantorCity ? true : false}
								/>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									fullWidth
									multiline
									rows={5}
									label='Residential Address'
									name='gaurantorsAddress'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.gaurantorsAddress
											? errors.gaurantorsAddress.message.toLowerCase()
											: ''
									}
									error={errors && errors.gaurantorsAddress ? true : false}
								/>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<CardActions>
						<div className={classes.buttons}>
							{activeStep !== 0 && (
								<Button onClick={handleBackAction} className={classes.button}>
									Back
								</Button>
							)}
						</div>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							// onClick={handleNextAction}
							className={classes.button}>
							Continue
						</Button>
					</CardActions>
				</form>
			</div>
		</>
	);
};

export default ProfileDetails;
