import React, { useState, useEffect } from 'react';
import {
	Divider,
	Typography,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
	Select,
	Button,
	MenuItem,
	makeStyles
} from '@material-ui/core';
import useHeader from '../../../../server/Headers';
import useAgent from '../../../../hooks/useAgent';
import { PersonAdd as PersonAddIcon, Person, Phone } from '@material-ui/icons';
import Style from './Styles';
import { BootstrapInput } from './Boostrap';
import { toast } from 'react-toastify';
import LoadingCenter from '../../../../components/LoadingCenter/LoadingCenter';

const useStyles = makeStyles((theme) => Style(theme));
const ChooseDownLine = () => {
	const [textDisplay, setTextDisplay] = useState(false);
	const [adduser, setaddUser] = useState(false);
	const [selectedUser, setselectedUser] = useState({});
	const [users, setUsers] = useState(false);
	const { headers } = useHeader();
	const classes = useStyles();
	const { data, loading } = useAgent(`/fla/downliner`, headers);
	const [downlines, setDownlines] = useState([]);

	const chooseDownLineToCheckout = (e) => {
		if (e.target.value === 'userList') {
			setUsers(true);
			setaddUser(false);
			setselectedUser('');
		} else {
			setaddUser(true);
			setTextDisplay(false);
			setUsers(false);
		}
	};

	const selectUser = (e) => {
		if (e.target.value === '') {
			return toast.error(
				'please choose your downline or you can signup a new user'
			);
		}
		const value = e.target.value;

		const filteredItem = downlines.filter((list) => list._id === value);
		setselectedUser(filteredItem[0]);
		setTextDisplay(true);
	};

	useEffect(() => {
		if (data.length) {
			setDownlines(data);
		}
	}, [data]);

	return (
		<div className={classes.paper}>
			{loading ? (
				<LoadingCenter />
			) : (
				<>
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
											<em>Choose from your list</em>
										</MenuItem>
										{downlines.map((user) => (
											<MenuItem value={user._id} key={user.id}>
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
								href={`/agents/frontline/product/checkout/${selectedUser._id}`}
								color='primary'>
								Proceed to checkout
							</Button>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default ChooseDownLine;
