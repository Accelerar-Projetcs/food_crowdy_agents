import React, { useCallback, useState } from 'react';
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
import { ArrowRightAltSharp as ForwardIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import {
	handleNext,
	getDetails
} from '../../../../Redux/Reducers/FLRegistration/index';
import ScrollTop from '../../../../ScrollToTop';
import BusinessTypesList from '../../../../utils/BusinessTypes';
import States_Lga from '../../../../utils/NigeriaStateLga';
import Styles from '../Styles';
import { BusinessInfoSchema } from '../Validators';
import { gender } from '../../../../utils/Gender';

const useStyles = makeStyles((theme) => Styles(theme));

const BusinessDetails = () => {
	const classes = useStyles();
	const [selectedLga, setselectedLga] = useState([]);
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(BusinessInfoSchema)
	});
	const formState = useSelector((state) => state.FLRegistration.step);
	const activeStep = formState.activeStep;
	const dispatch = useDispatch();

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
			name,
			type,
			state,
			lga,
			city,
			address,
			storeNumber,
			phoneNumber
		} = data;

		const business = {
			name,
			type,
			state,
			lga,
			city,
			address,
			storeNumber,
			phoneNumber
		};
		const businessForm = {
			business
		};
		
		const number = activeStep + 1;
		dispatch(handleNext(number));
		dispatch(getDetails(businessForm));
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
								name='name'
								variant='outlined'
								inputRef={register}
								helperText={errors && errors.name ? errors.name.message : ''}
								error={errors && errors.name ? true : false}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Business Phone Number'
								name='phoneNumber'
								variant='outlined'
								type='number'
								inputRef={register}
								helperText={
									errors && errors.phoneNumber ? errors.phoneNumber.message : ''
								}
								error={errors && errors.phoneNumber ? true : false}
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								name='type'
								select
								SelectProps={{ native: true }}
								variant='outlined'
								inputRef={register}
								helperText={errors && errors.type ? errors.type.message : ''}
								error={errors && errors.type ? true : false}>
								<option value={''}>Business Type</option>
								{BusinessTypesList.map((option) => (
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
								name='address'
								variant='outlined'
								multiline
								rows={5}
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
								onChange={getReleventLga}
								inputRef={register}
								helperText={errors && errors.state ? errors.state.message : ''}
								error={errors && errors.state ? true : false}>
								<option value={''}>State</option>
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
								error={errors && errors.lGsA ? true : false}>
								<option value={''}>L.G.A</option>
								{selectedLga.map((option) => (
									<option key={option.id} value={option.name}>
										{option.name}
									</option>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								name='city'
								select
								SelectProps={{ native: true }}
								variant='outlined'
								inputRef={register}
								helperText={errors && errors.city ? errors.city.message : ''}
								error={errors && errors.city ? true : false}>
								<option value={''}>City</option>
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
						endIcon={<ForwardIcon />}
						className={classes.button}>
						Continue
					</Button>
				</div>
			</div>
		</form>
	);
};

export default BusinessDetails;
