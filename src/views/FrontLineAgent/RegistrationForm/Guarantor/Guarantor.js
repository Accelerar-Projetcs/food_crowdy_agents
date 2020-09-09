import React, { useState, useCallback } from 'react';
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
import { ArrowRightAltSharp as ForwardIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleNext,
	getDetails
} from '../../../../Redux/Reducers/FLRegistration/index';
import States_Lga from '../../../../utils/NigeriaStateLga';
import { GuarantorInfoSchema } from '../Validators/';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import ScrollTop from '../../../../ScrollToTop';
import Styles from '../Styles';
import { gender } from '../../../../utils/Gender';

const useStyles = makeStyles((theme) => Styles(theme));

const Guarantor = () => {
	const [selectedLga, setselectedLga] = useState([]);
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(GuarantorInfoSchema)
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
		const {
			lga,
			email,
			gender,
			address,
			surName,
			stateOfOrigin,
			firstName,
			occupation,
			phoneNumber,
			otherNames,
			relationship,
			nationality
		} = data;

		const guarantor = {
			lga,
			email,
			address,
			gender,
			surName,
			firstName,
			stateOfOrigin,	
			occupation,
			phoneNumber,
			otherNames,
			relationship,
			nationality
		};

		const guarantorData = {
			guarantor
		};

		const number = activeStep + 1;
		dispatch(getDetails(guarantorData));
		dispatch(handleNext(number));
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
									name='surName'
									type='text'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.surName ? errors.surName.message : ''
									}
									error={errors && errors.surName ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='First name'
									name='firstName'
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
									type='number'
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
									label='Occupation'
									name='occupation'
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.occupation ? errors.occupation.message : ''
									}
									error={errors && errors.occupation ? true : false}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									name='gender'
									select
									SelectProps={{ native: true }}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.gender ? errors.gender.message : ''
									}
									error={errors && errors.gender ? true : false}>
									<option value={''}>Gender</option>
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
									onChange={getReleventLga}
									variant='outlined'
									inputRef={register}
									helperText={
										errors && errors.stateOfOrigin
											? errors.stateOfOrigin.message
											: ''
									}
									error={errors && errors.stateOfOrigin ? true : false}>
									<option value={''}>State of origin</option>
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
									<option value={''}>Choose L.G.A</option>
									{selectedLga.map((option) => (
										<option key={option.name} value={option.name}>
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

export default Guarantor;
