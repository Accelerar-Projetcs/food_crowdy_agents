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
import Styles from './Styles';
import { gender, relationshipStatus } from '../../../../utils/Gender';

const useStyles = makeStyles((theme) => Styles(theme));

const PersonalDetails = () => {
	const [selectedLga, setselectedLga] = useState([]);
	const [date, setDate] = useState(
		new Date('Tue Sep 04 1990 10:41:14 GMT+0100 (West Africa Standard Time)')
	);
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(PersonalInfoSchema)
	});
	const formState = useSelector((state) => state.FLRegistration.step);
	const activeStep = formState.activeStep;
	const dispatch = useDispatch();
	const classes = useStyles();

	const getReleventLga = useCallback((e) => {
		const id = e.target.value;
		if (id !== '') {
			const id = e.target.value;
			const relevantLga = States_Lga.filter((list) =>
				list.state.name === id ? list : null
			);
			setselectedLga(relevantLga[0].state.locals);
		} else {
			setselectedLga([]);
		}
	}, []);

	const handleNextAction = (data) => {
		const dateOfBirth = JSON.stringify(date);
		const {
			bvn,
			city,
			lga,
			state,
			email,
			gender,
			address,
			lastName,
			firstName,
			otherNames,
			nationality,
			phoneNumber,
			relationship,
			stateOfOrigin,
			nameOfnextOfKin,
			indentificationType,
			phoneNumberNextOfKin,
			indentificationNumber
		} = data;

		const nextOfKin = {
			name: nameOfnextOfKin,
			phoneNumber: phoneNumberNextOfKin
		};

		const identification = {
			type: indentificationNumber,
			number: indentificationType
		};

		const form = {
			bvn,
			lga,
			city,
			email,
			address,
			lastName,
			nextOfKin,
			firstName,
			dateOfBirth,
			otherNames,
			relationship,
			phoneNumber,
			nationality,
			identification,
			stateOfOrigin,
			gender,
			state
		};
		const number = activeStep + 1;
		dispatch(getDetails(form));
		dispatch(handleNext(number));
	};

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
										errors && errors.firstName ? errors.firstName.message : ''
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
									type='number'
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
									// label='Gender'
									name='gender'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.gender ? errors.gender.message : ''
									}
									error={errors && errors.gender ? true : false}>
									<option value={''}>Choose gender</option>
									{gender.map((option) => (
										<option key={option.id} value={option.value}>
											{option.value}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									name='relationship'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.relationship
											? errors.relationship.message
											: ''
									}
									error={errors && errors.relationship ? true : false}>
									<option value={''}>Relationship Status</option>
									{relationshipStatus.map((option) => (
										<option key={option.id} value={option.value}>
											{option.value}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item md={6} xs={12}>
								<MuiPickersUtilsProvider utils={DateFnsUtil}>
									<KeyboardDatePicker
										margin='none'
										variant={'dialog'}
										value={date}
										fullWidth
										name='dateOfBirth'
										id='date-picker-dialog'
										label='Date of birth'
										format='MM-dd-yyyy'
										onChange={(date) => setDate(date)}
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
									name='stateOfOrigin'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									onChange={getReleventLga}
									inputRef={register}
									helperText={
										errors && errors.stateOfOrigin
											? errors.stateOfOrigin.message
											: ''
									}
									error={errors && errors.stateOfOrigin ? true : false}>
									<option value={''}>Choose state of origin</option>
									{States_Lga.map((option) => (
										<option key={option.state.id} value={option.state.name}>
											{option.state.name}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									fullWidth
									name='lga'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={errors && errors.lga ? errors.lga.message : ''}
									error={errors && errors.lga ? true : false}>
									<option value={''}>Choose (L.G.A)</option>
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
									name='state'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.state ? errors.state.message : ''
									}
									error={errors && errors.state ? true : false}>
									<option value={''}>Choose current state</option>
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
									type='number'
									variant='outlined'
									inputRef={register}
									helperText={errors && errors.bvn ? errors.bvn.message : ''}
									error={errors && errors.bvn ? true : false}
								/>
							</Grid>

							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
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
									<option value={''}>Means of Identity</option>
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
							<Grid item md={12} xs={12}>
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
