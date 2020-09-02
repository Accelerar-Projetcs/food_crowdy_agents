import React, { useState, useEffect, useCallback } from 'react';
import {
	Button,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	makeStyles,
	Typography,
	CardActions
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import { ArrowRightAltSharp as ForwardIcon } from '@material-ui/icons';
import DateFnsUtil from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import States_Lga from '../../../../utils/NigeriaStateLga';
import { PersonalInfoSchema } from '../Validators/';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import {
	handleNext,
	getDetails
} from '../../../../Redux/Reducers/FLRegistration/index';
import ScrollTop from '../../../../ScrollToTop';
import Styles from '../Styles';

const useStyles = makeStyles((theme) => Styles(theme));

const PersonalDetails = () => {
	const [selectedLga, setselectedLga] = useState([]);
	const [date, setDate] = useState(new Date());
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(PersonalInfoSchema)
	});
	const formState = useSelector((state) => state.FLRegistration.step);
	const activeStep = formState.activeStep;
	const dispatch = useDispatch();
	const classes = useStyles();

	const getReleventLga = useCallback((e) => {
		const id = e.target.value;
		const relevantLga = States_Lga.filter((list) =>
			list.state.name === id ? list : null
		);
		setselectedLga(relevantLga[0].state.locals);
	}, []);

	const handleNextAction = (data) => {
		data.dateOfBirth = JSON.stringify(date);
		const number = activeStep + 1;
		dispatch(handleNext(number));
		dispatch(getDetails(data));
		console.log(data);
	};

	/**
	 * Resolve with useCallback
	 */
	// useEffect(() => {}, [selectedLga, getReleventLga]);
	useEffect(() => {}, [selectedLga]);

	return (
		<>
			<ScrollTop />
			<div className={classes.Card}>
				<CardHeader
					className={classes.CardHeader}
					title={
						<div>
							<Typography className={classes.text} variant='h5'>
								Personal Details
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
									label='First Name '
									name='firstName'
									type='text'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.firstName
											? errors.firstName.message.toLowerCase()
											: ''
									}
									error={errors && errors.firstName ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Last name'
									name='lastName'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.lastName ? errors.lastName.message : ''
									}
									error={errors && errors.lastName ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Other Names'
									name='otherNames'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.otherNames ? errors.otherNames.message : ''
									}
									error={errors && errors.otherNames ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Email Address'
									name='email'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.email ? errors.email.message : ''
									}
									error={errors && errors.email ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Phone Number'
									name='phoneNumber'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.phoneNumber
											? errors.phoneNumber.message
											: ''
									}
									error={errors && errors.phoneNumber ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Gender'
									name='gender'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.gender ? errors.gender.message : ''
									}
									error={errors && errors.gender ? true : false}>
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
									label='Relationship'
									name='relationship'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.relationship
											? errors.relationship.message
											: ''
									}
									error={errors && errors.relationship ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<MuiPickersUtilsProvider utils={DateFnsUtil}>
									<KeyboardDatePicker
										margin='normal'
										variant={'inline'}
										name='dateOfBirth'
										id='date-picker-dialog'
										label='Date of birth'
										format='MM/dd/yyyy'
										// inputRef={register}
										onChange={(date) => setDate(date)}
										helperText={
											errors && errors.dateOfBirth
												? errors.dateOfBirth.message
												: ''
										}
										error={errors && errors.dateOfBirth ? true : false}
										KeyboardButtonProps={{
											'aria-label': 'change date'
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Nationality'
									name='nationality'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.nationality
											? errors.nationality.message
											: ''
									}
									error={errors && errors.nationality ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='State of origin'
									name='stateOfOrgin'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									onChange={getReleventLga}
									inputRef={register}
									helperText={
										errors && errors.stateOfOrgin
											? errors.stateOfOrgin.message
											: ''
									}
									error={errors && errors.stateOfOrgin ? true : false}>
									{States_Lga.map((option) => (
										<option key={option.state.id} value={option.state.name}>
											{option.state.name}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									name='lga'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={errors && errors.lga ? errors.lga.message : ''}
									error={errors && errors.lga ? true : false}>
									<option value={''}>Select LGA</option>
									{selectedLga.map((option) => (
										<option key={option.id} value={option.name}>
											{option.name}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									fullWidth
									multiline
									rows={5}
									label='Residential Address'
									name='address'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.address ? errors.address.message : ''
									}
									error={errors && errors.address ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='State'
									name='currentState'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.currentState
											? errors.currentState.message
											: ''
									}
									error={errors && errors.currentState ? true : false}>
									{States_Lga.map((option) => (
										<option key={option.state.id} value={option.state.name}>
											{option.state.name}
										</option>
									))}
								</TextField>
							</Grid>

							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='City/Town'
									name='city'
									variant='outlined'
									inputRef={register}
									helperText={errors && errors.city ? errors.city.message : ''}
									error={errors && errors.city ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='BVN'
									name='bvn'
									variant='outlined'
									inputRef={register}
									helperText={errors && errors.bvn ? errors.bvn.message : ''}
									error={errors && errors.bvn ? true : false}
								/>
							</Grid>

							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Means of Identity'
									name='indentificationType'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.indentificationType
											? errors.indentificationType.message
											: ''
									}
									error={errors && errors.indentificationType ? true : false}>
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

							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Identity Number'
									name='indentificationNumber'
									variant={'outlined'}
									inputRef={register}
									helperText={
										errors && errors.indentificationNumber
											? errors.indentificationNumber.message
											: ''
									}
									error={errors && errors.indentificationNumber ? true : false}
								/>
							</Grid>

							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Full name (Next of kin)'
									name='nameOfnextOfKin'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.nameOfnextOfKin
											? errors.nameOfnextOfKin.message
											: ''
									}
									error={errors && errors.nameOfnextOfKin ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Phone number (Next of kin)'
									name='phoneNumberNextOfKin'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.phoneNumberNextOfKin
											? errors.phoneNumberNextOfKin.message
											: ''
									}
									error={errors && errors.phoneNumberNextOfKin ? true : false}
								/>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<CardActions>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							endIcon={<ForwardIcon />}
							className={classes.button}>
							Continue
						</Button>
					</CardActions>
				</form>
			</div>
		</>
	);
};

export default PersonalDetails;
