import React, { useState } from 'react';
import {
	Divider,
	Typography,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
	Select,
	InputLabel,
	Button,
	MenuItem,
	makeStyles
} from '@material-ui/core';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';
import Style from './Styles';
import { BootstrapInput } from './Boostrap';

const useStyles = makeStyles((theme) => Style(theme));

const DeliveryMethod = () => {
	const classes = useStyles();
	const [textDisplay, setTextDisplay] = useState(false);
	const [adduser, setaddUser] = useState(false);
	const [deliveryNotice, setdeliveryNotice] = useState(false);
	const [nameOfLandmark, setnameOfLandmark] = useState('');
	const [users, setUsers] = useState(false);
	const [age, setAge] = useState('');


	const deliveryOption = (e) => {
		if (e.target.value === 'doorDelivery') {
			setUsers(true);
			setaddUser(false);
		} else {
			setaddUser(true);
			setUsers(false);
		}
	};

	const selectState = (e) => {
		setAge(e.target.value);
		if (e.target.value === '') {
			setdeliveryNotice(false);
			setTextDisplay(false);
			return;
		}
		const filteredItem = [{location:'dkdkdk'}]
		setdeliveryNotice(true);
		setnameOfLandmark(filteredItem[0].location);
		setTextDisplay(true);
	};

	return (
		<div className={classes.paper}>
			<Typography variant='h6' className={classes.typograghyTitle}>
				<PersonAddIcon color='primary' /> Choose your downline
			</Typography>
			<Typography className={classes.typograghy}>
				<strong>Please Choose from </strong>
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
						label='1. Choose from downlines'
					/>
					{/* <Divider /> */}
					{users && (
						<FormControl fullWidth className={classes.margin}>
							<InputLabel id='demo-customized-select-label'>Age</InputLabel>
							<Select
								labelId='demo-customized-select-label'
								id='demo-customized-select'
								value={age}
								onChange={selectState}
								input={<BootstrapInput />}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								{['abia'].map((state) => (
									<MenuItem value={state} key={state}>
										{state}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
					{deliveryNotice && textDisplay && (
						<>
							{/* <Divider /> */}
							<Typography className={classes.text} variant='h6'>
								You will be charged
								<strong> {'formatter.format(deliveryFee)'}</strong> for your
								Delivery to {nameOfLandmark}
							</Typography>
							<Divider />
							<Typography className={classes.text} variant='body1'>
								Please provide us your delivery Address
							</Typography>
						</>
					)}
					<Divider className={classes.TextField} />
					<FormControlLabel
						value={'pickUp'}
						control={<Radio />}
						label={'2. Add new downline'}
					/>
					{adduser && (
						<div>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								href='/agents/frontline/add-downlines'
								color='primary'>
								Register User
							</Button>
						</div>
					)}
				</RadioGroup>
				<Divider />
			</FormControl>
			<div>
				<Button
					type='submit'
					// fullWidth
					variant='contained'
					href='/agents/frontline/product/checkout'
					color='primary'>
					Proceed to checkout
				</Button>
			</div>
		</div>
	);
};

export default DeliveryMethod;
