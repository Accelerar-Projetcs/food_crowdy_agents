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
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

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

const ExistingUser = () => {
	const [open, setOpen] = useState(true);
	const classes = useStyles();

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
							<TextField
								className={classes.textField}
								fullWidth
								label='user ID '
								name='name'
								// onChange={handleChange}
								type='text'
								variant='outlined'
							/>

							<TextField
								className={classes.textField}
								fullWidth
								multiline
								label=' User Address'
								name='address'
								type='text'
								rows={7}
								variant='outlined'
							/>
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

export default ExistingUser;
