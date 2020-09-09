import React, { useState } from 'react';
import { Dialog, Card, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Form from './DownSignUpForm/Form';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		padding: theme.spacing(2)
	}
}));

const DownLineForm = () => {
	const [open] = useState(true);
	const classes = useStyles();

	return (
		<Dialog
			className={classes.root}
			open={open}
			scroll="body"
			aria-labelledby='form-dialog-title'>
			<Card>
				<CardHeader title='DownLine Details' />
				<Form />
			</Card>
		</Dialog>
	);
};

export default DownLineForm;
