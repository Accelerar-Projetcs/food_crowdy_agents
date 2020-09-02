import React, { useState, useEffect } from 'react';
import {
	Divider,
	Typography,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
	Select,
	InputLabel
} from '@material-ui/core';
import {
	CardTravel as CardTravelIcon,
	LocationOn as LocationIcon
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { formatter } from '../../../../utils/localStore';
import Style from './Styles';
import locationList from './Location';

const useStyles = makeStyles((theme) => Style(theme));

const DeliveryMethod = ({ totalAmount }) => {
	const classes = useStyles();
	const [textDisplay, setTextDisplay] = useState(false);
	const [deliveryNotice, setdeliveryNotice] = useState(false);
	const [nameOfLandmark, setnameOfLandmark] = useState('');
	const [location, setLocation] = useState(false);
	const [addressForm, setAddressForm] = useState(' The');
	const [deliveryFee, setdeliveryFee] = useState(0);

	console.log(locationList);

	const deliveryOption = (e) => {
		if (e.target.value === 'doorDelivery') {
			setLocation(true);
		} else {
			setLocation(false);
			setAddressForm('pickup');
			setdeliveryNotice(false);
			setTextDisplay(false);
			setdeliveryFee(0);
		}
	};

	const selectState = (e) => {
		if (e.target.value === '') {
			setdeliveryNotice(false);
			setTextDisplay(false);
			return;
		}
		const locationId = e.target.value;
		const filteredItem = locationList.filter(
			(list) => list.location === locationId
		);
		setdeliveryNotice(true);
		setdeliveryFee(filteredItem[0].price);
		setnameOfLandmark(filteredItem[0].location);
		setTextDisplay(true);
	};

	useEffect(() => {}, [deliveryNotice, deliveryFee]);

	return (
		<div>
			<Typography variant='h6' className={classes.typograghyTitle}>
				<CardTravelIcon color='primary' /> DELIVERY METHOD
			</Typography>
			<Typography className={classes.typograghy}>
				<strong>How do you want your order delivered?</strong>
			</Typography>
			<Divider />
			<FormControl component='fieldset'>
				<RadioGroup
					aria-label='foodCategory'
					name='category'
					onChange={deliveryOption}>
					<FormControlLabel
						value={'doorDelivery'}
						control={<Radio />}
						label='1. Door Delivery'
					/>
					<Alert severity='info'>
						<AlertTitle>Notice</AlertTitle>
						<span className={classes.text}>
							We offer home delivery for every product purchased within
							portharcourt , please input your delivery address details
						</span>
					</Alert>
					<Divider />
					{location && (
						<>
							<FormControl
								color='primary'
								variant='outlined'
								className={classes.formControl2}>
								<InputLabel
									className={classes.input}
									htmlFor='outlined-native-simple'>
									{/* Locations in Portharcourt */}
								</InputLabel>
								<Select
									native
									className={classes.input}
									onChange={selectState}
									label='Choose Area of delivery'
									inputProps={{
										name: 'area',
										id: 'outlined-native-simple'
									}}>
									<option value={''}> Choose your city in Portharcourt </option>
									{locationList.map((list) => (
										<option key={list.location} value={list.location}>
											{list.location}
										</option>
									))}
								</Select>
							</FormControl>
						</>
					)}
					{deliveryNotice && (
						<>
							<Divider />
							<Typography className={classes.text} variant='h6'>
								You will be charged
								<strong> {formatter.format(deliveryFee)}</strong> for your
								Delivery to {nameOfLandmark}
							</Typography>
							<Divider />
							<Typography className={classes.text} variant='body1'>
								Please provide us your delivery Address
							</Typography>
						</>
					)}
					{textDisplay && (
						<TextField
							className={classes.TextField}
							id='standard-multiline-static'
							multiline
							placeholder='Enter your delivery Address'
							color='secondary'
							rows={7}
							variant='outlined'
							fullWidth
							value={addressForm}
							onChange={(e) => setAddressForm(e.target.value)}
						/>
					)}
					<Divider className={classes.TextField} />
					<FormControlLabel
						value={'pickUp'}
						control={<Radio />}
						label={'2. Pick Up'}
					/>
					<Alert severity='info'>
						<AlertTitle></AlertTitle>
						You will be expected to come to this address to pick up your item
					</Alert>
				</RadioGroup>
				<div className={classes.location}>
					<LocationIcon />
				</div>
				No 4 Eliada Close, Off Okporo Road Artillery, Port Harcourt, Rivers Ng
				<Divider />
			</FormControl>
		</div>
	);
};

DeliveryMethod.prototype = {
	totalAmount: PropTypes.number.isRequired
};

export default DeliveryMethod;
