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
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio
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

const DownLineForm = () => {
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
							<CardHeader subheader='' title='DownLine Details' />
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
								label='Full Name'
								name='name'
								// onChange={handleChange}
								type='text'
								variant='outlined'
							/>
							<TextField
								className={classes.textField}
								fullWidth
								label=' Email'
								name='email'
								type='email'
								variant='outlined'
							/>
							<TextField
								className={classes.textField}
								fullWidth
								label=' Email'
								name='Phone'
								type='number'
								disabled
								value={'08165084064'}
								variant='outlined'
							/>
							<FormControl component='fieldset'>
								<RadioGroup aria-label='foodCategory' name='foodCatergory1'>
									<FormControlLabel
										value='male'
										control={<Radio />}
										label='Male'
									/>
									<FormControlLabel
										value='female'
										control={<Radio />}
										label='Female'
									/>
								</RadioGroup>
							</FormControl>
						</CardContent>

						<Divider />
						<CardActions>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'>
								Submit
							</Button>
						</CardActions>
					</form>
				</Card>
			</Dialog>
		</div>
	);
};

export default DownLineForm;
