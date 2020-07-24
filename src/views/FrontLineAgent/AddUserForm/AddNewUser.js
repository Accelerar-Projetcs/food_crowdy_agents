import React, { useState } from 'react';
import {
	Dialog,
	Card,
	CardHeader,
	CardActions,
	Button,
	Divider,
	IconButton,
	TextField,
	CardContent,
	Grid
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import States from '../../../utils/LocationList';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%'
	},
	close: {
		display: `flex`,
		justifyContent: 'space-between'
	},
	textField: {
		marginTop: theme.spacing(2)
	},
	btn: {
		color: theme.palette.error.main,
		border: `1px solid ${theme.palette.error.main}`
	}
}));

const AddNewUser = ( ) => {
	const [open, setOpen] = useState(true);
	const classes = useStyles();
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div className={classes.root}>
			<Dialog
				className={classes.root}
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'>
				<Card>
					<form>
						<div className={classes.close}>
							<CardHeader subheader='' title='User Information' />
							<div>
								<IconButton aria-label='close' onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</div>
						</div>
						<Divider />
						<CardContent>
							<Grid container spacing={2}>
								<Grid item lg={6} md={6} xl={12}>
									<TextField
										className={classes.textField}
										fullWidth
										label='name '
										name='name'
										// onChange={handleChange}
										type='text'
										variant='outlined'
									/>
								</Grid>
								<Grid item lg={6} md={6} xl={12}>
									<TextField
										className={classes.textField}
										fullWidth
										label='Email address'
										name='email'
										type='text'
										variant='outlined'
									/>
								</Grid>
								<Grid item lg={6} md={6} xl={12}>
									<TextField
										className={classes.textField}
										fullWidth
										label='Phone Number'
										name='phoneNumber'
										type='number'
										variant='outlined'
									/>
								</Grid>
								<Grid item lg={6} md={6} xl={12}>
									<TextField
										className={classes.textField}
										id='outlined-select-state'
										select
										label='State'
										fullWidth
										name='location'
										// onChange={handleChange}
										SelectProps={{
											native: true
										}}
										helperText='Please select your state'
										variant='outlined'>
										{States.map((option) => (
											<option key={option.id} value={option.name}>
												{option.name}
											</option>
										))}
									</TextField>
								</Grid>
							</Grid>
						</CardContent>
						<CardHeader subheader='' title='Buying Informations' />
						<Divider />
						<CardContent>
							<TextField
								fullWidth
								label='No of parts'
								name='noOfPrt'
								type='text'
								variant='outlined'
							/>
						</CardContent>
						<Divider />
						<CardActions>
							<Button
								onClick={handleClose}
								variant='outlined'
								className={classes.btn}
								color='inherit'>
								CANCEL
							</Button>
							<Button type='submit' variant='contained' color='primary'>
								MAKE PAYMENT
							</Button>
						</CardActions>
					</form>
				</Card>
			</Dialog>
		</div>
	);
};

export default AddNewUser;
