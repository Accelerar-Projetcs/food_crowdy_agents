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
import { PersonAdd as PersonAddIcon, Person, Phone } from '@material-ui/icons';
import Style from './Styles';
import { BootstrapInput } from './Boostrap';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => Style(theme));

const downlines = [
	{
		id: '5f57c9978d2c0a327cf0b832',
		isVerified: false,
		name: 'bigboydev',
		email: 'infinity_michael55@yahoo.com',
		phoneNumber: '2348035745638',
		location: 'Borno ',
		userName: 'bigbo23',
		uniqueId: 'FCUSR1008',
		referralId: 'FCFL1003',
		createdAt: { $date: '2020-09-08T18:12:39.969Z' },
		updatedAt: { $date: '2020-09-08T18:12:39.969Z' },
		__v: 0
	}
];
const ChooseDownLine = () => {
	const classes = useStyles();
	const [textDisplay, setTextDisplay] = useState(false);
	const [adduser, setaddUser] = useState(false);
	const [selectedUser, setselectedUser] = useState('');

	const [users, setUsers] = useState(false);

	const chooseDownLineToCheckout = (e) => {
		if (e.target.value === 'userList') {
			setUsers(true);
			setaddUser(false);
			setselectedUser('');
		} else {
			setaddUser(true);
			setUsers(false);
		}
	};

	const selectUser = (e) => {
		if (e.target.value === '') {
			toast.error('please choose your downline or you can signup a new user');
		}
		const value = e.target.value;
		const filteredItem = downlines.filter((list) => list.id === value);
		setselectedUser(filteredItem[0]);
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
					aria-label='checkoutUser'
					name='category'
					onChange={chooseDownLineToCheckout}>
					<FormControlLabel
						value={'userList'}
						control={<Radio />}
						label='1. Choose from downlines'
					/>
					{users && (
						<FormControl fullWidth className={classes.margin}>
							{/* <InputLabel id='demo-customized-select-label'>Age</InputLabel> */}
							<Select
								labelId='demo-customized-select-label'
								id='demo-customized-select'
								onChange={selectUser}
								input={<BootstrapInput />}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								{downlines.map((user) => (
									<MenuItem value={user.id} key={user.id}>
										{user.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
					{textDisplay && (
						<>
							<Typography className={classes.text} variant='h6'>
								<Person /> {selectedUser.name}
							</Typography>
							<Divider />
							<Typography className={classes.text} variant='body1'>
								<Phone /> {selectedUser.phoneNumber}
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
				{!adduser && users && selectedUser && (
					<Button
						type='submit'
						// fullWidths
						variant='contained'
						href={`/agents/frontline/product/checkout/${selectedUser.id}`}
						color='primary'>
						Proceed to checkout
					</Button>
				)}
			</div>
		</div>
	);
};

export default ChooseDownLine;
