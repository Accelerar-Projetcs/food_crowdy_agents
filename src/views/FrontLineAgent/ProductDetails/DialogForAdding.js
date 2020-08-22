import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {
	Button,
	Dialog,
	Card,
	CardHeader,
	CardContent,
	DialogActions,
	IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { getUserName } from '../../../utils/localStore';

/****
 * Components for adding New and Existing users from the frontline-End
 */

import AddNewUser from '../AddUserForm/AddNewUser';
import ExistingUser from '../AddUserForm/AddExistingUser';
import CloseIcon from '@material-ui/icons/Close';

import {dialogStyles} from './styles/Styles';
const styles = makeStyles((theme) => (dialogStyles(theme)));

export default function CustomizedDialogs({ open, setOpen }) {
	const [newUser, setNewUser] = useState(false);
	const [existingUser, setExistingUser] = useState(false);
	const userName = getUserName();
	const classes = styles();
	const handleClose = () => {
		// setOpenDialog(false);
		setOpen(false);
	};


	return (
		<div>
			{newUser && <AddNewUser />}
			{existingUser && <ExistingUser />}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'>
				<Card>
					<div className={classes.close}>
						<CardHeader
							subheader=''
							title={
								<span>
									Hi <strong>${userName}</strong> you are about to Increase your
									earnings
								</span>
							}
						/>
						<div>
							<IconButton aria-label='close' onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</div>
					</div>
					<Alert severity='info'>
						<AlertTitle>Info</AlertTitle>
						Please ensure you have sufficient balance in your wallet account
						inorder to proceed with this action
						<br />
						you can fund your wallet.
					</Alert>
					<CardContent dividers>
						<Typography gutterBottom>
							Are you adding an existing user or new user?
						</Typography>
					</CardContent>
					<DialogActions>
						<Button
							className={classes.btnOrange}
							onClick={() => setExistingUser(!existingUser)}
							variant='contained'
							size='small'
							color='inherit'>
							Existing User
						</Button>
						<Button
							onClick={() => setNewUser(!newUser)}
							variant='contained'
							size='small'
							color='primary'>
							New User
						</Button>
					</DialogActions>
				</Card>
			</Dialog>
		</div>
	);
}
