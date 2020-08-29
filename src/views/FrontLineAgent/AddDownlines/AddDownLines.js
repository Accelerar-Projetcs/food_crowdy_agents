import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab/';
// import BackDrop from '../../components/backdrop/Backdrop';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	TextField,
	Typography,
	Paper,
	Avatar
} from '@material-ui/core';
import Style from './Styles';
import ConfirmOTP from './ConfirmOTP'

const useStyles = makeStyles((theme) => Style(theme));

const AddDownLines = () => {
	const classes = useStyles();
	const [email, setemail] = useState('');
	const [mailCheck, setmailCheck] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setemail(event.target.value);
	};

	const sendPasswordResetLink = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await (`/forgot`, { email });
			setmailCheck(true);
		} catch (error) {
			const { response } = error;
			if (response === undefined) {
				setMessage(error.message);
			} else if (response.data) {
				setMessage(response.data.message);
			}
		}
		setLoading(false);
	};

	return (
		<Paper className={classes.paper}>
			{/* {loading && <BackDrop load={true} />} */}
			{mailCheck ? (
				<ConfirmOTP />
			) : (
				<Card className={classes.checkMail}>
					<Divider />
					<CardContent>
						{message && (
							<Alert variant='outlined' severity='error'>
								{message}
							</Alert>
						)}

						<CardHeader
							title={<Typography variant='h3'> Add DownLine</Typography>}
						/>

						<Divider />
						<div>
							<Avatar
								// style={{ textAlign: 'center' }}
								className={classes.avatar}
								src={'/wepowewe/qwioqwi'}
							/>
						</div>
						<CardContent>
							<span>Enter the phone of the downline you want to add</span>
							<form onSubmit={sendPasswordResetLink}>
								<TextField
									fullWidth
									label='Phone Number'
									name='email'
									onChange={handleChange}
									style={{ marginTop: '1rem' }}
									type='number'
									variant='outlined'
									required
								/>
								<Button
									className={classes.btn}
									color='primary'
									type='submit'
									disabled={loading ? true : false}
									variant='contained'>
									Proceed
								</Button>
							</form>
						</CardContent>
						<Divider />
					</CardContent>
				</Card>
			)}
		</Paper>
	);
};

export default AddDownLines;
