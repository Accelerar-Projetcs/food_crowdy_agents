import React, { useState } from 'react';
import { makeStyles, Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab/';
import { SignUpSchema } from './validator';
import { toast } from 'react-toastify';
import States from '../../../../utils/NigeriaStateLga';
import { yupResolver } from '@hookform/resolvers';
import { useHistory } from 'react-router-dom';
import { errorHandler } from '../../../../errors/errorHandler';
import useHeader from '../../../../server/Headers';
import { agentApi } from '../../../../server/Server';
import BackDrop from '../../../../components/BackDrop/BackDrop';
import Styles from './Styles';

const useStyles = makeStyles((theme) => Styles(theme));

const Form = ({ location }) => {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState('');
	const { headers } = useHeader();
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(SignUpSchema)
	});
	const history = useHistory();

	const classes = useStyles();

	const handleLogin = async (values) => {
		setLoading(!loading);
		values.phoneNumber = `234${Number(values.phoneNumber)}`;

		try {
			await agentApi.post('/fla/user-auth/signup', values, {
				headers
			});

			toast.success(`user succesfully added`);
			if (location && location.state) {
				history.replace(`${location.state.pathname}`);
			} else {
				history.replace('/');
			}
		} catch (error) {
			const errorMessage = errorHandler(error);
			setMessage(errorMessage);
			setLoading(false);
		}
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
			{loading && <BackDrop />}
			{message && (
				<Alert variant='outlined' severity='error'>
					{message}
				</Alert>
			)}
			<TextField
				className={classes.textField}
				fullWidth
				label='Name '
				name='name'
				type='text'
				variant='outlined'
				inputRef={register}
				helperText={errors && errors.name ? errors.name.message : ''}
				error={errors && errors.name ? true : false}
			/>
			<TextField
				className={classes.textField}
				fullWidth
				inputRef={register}
				helperText={errors && errors.userName ? errors.userName.message : ''}
				error={errors && errors.userName ? true : false}
				label='User Name'
				name='userName'
				type='text'
				variant='outlined'
			/>
			<TextField
				className={classes.textField}
				fullWidth
				inputRef={register}
				helperText={errors && errors.email ? errors.email.message : ''}
				error={errors && errors.email ? true : false}
				label='Email address'
				name='email'
				type='email'
				variant='outlined'
			/>

			<TextField
				className={classes.textField}
				fullWidth
				inputRef={register}
				helperText={
					// errors && errors.phoneNumber ? errors.phoneNumber.message : ''
					errors && errors.phoneNumber ? 'phone number is required' : ''
				}
				error={errors && errors.phoneNumber ? true : false}
				label='Phone Number'
				name='phoneNumber'
				type='text'
				variant='outlined'
			/>
			<br />
			<TextField
				className={classes.textField}
				id='outlined-select-state'
				select
				fullWidth
				name='location'
				inputRef={register}
				helperText={errors && errors.location ? errors.location.message : ''}
				error={errors && errors.location ? true : false}
				SelectProps={{
					name: 'location',
					native: true
				}}
				variant='outlined'>
				<option value={''}>Choose State</option>
				{States.map((option) => (
					<option key={option.state.id} value={option.state.name}>
						{option.state.name}
					</option>
				))}
			</TextField>
			<Button
				className={classes.btn}
				color='primary'
				disabled={loading ? true : false}
				fullWidth
				size='large'
				type='submit'
				variant='contained'>
				Register
			</Button>
		</form>
	);
};

export default Form;
