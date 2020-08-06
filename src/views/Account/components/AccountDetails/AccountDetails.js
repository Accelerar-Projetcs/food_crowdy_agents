import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {}
}));

const AccountDetails = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	const [values, setValues] = useState({});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	const states = [];

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<form autoComplete='off' noValidate>
				<CardHeader subheader='The information can be edited' title='Profile' />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								helperText='Please specify the first name'
								label='First name'
								margin='dense'
								name='firstName'
								onChange={handleChange}
								required
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Last name'
								margin='dense'
								name='lastName'
								onChange={handleChange}
								required
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Email Address'
								margin='dense'
								name='email'
								onChange={handleChange}
								required
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Phone Number'
								margin='dense'
								name='phone'
								onChange={handleChange}
								type='number'
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Select State'
								margin='dense'
								name='state'
								onChange={handleChange}
								required
								select
								SelectProps={{ native: true }}
								variant='outlined'></TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Country'
								margin='dense'
								name='country'
								onChange={handleChange}
								required
								variant='outlined'
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardActions>
					<Button color='primary' variant='contained'>
						Save details
					</Button>
				</CardActions>
			</form>
		</Card>
	);
};

AccountDetails.propTypes = {
	className: PropTypes.string
};

export default AccountDetails;
