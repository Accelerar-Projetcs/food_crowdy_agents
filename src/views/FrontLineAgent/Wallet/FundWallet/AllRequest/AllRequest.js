import React from 'react';
import { Dialog, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Styles from '../Style';
import RequestTable from './Table';

const useStyles = makeStyles((theme) => Styles(theme));

const AllRequest = ({ setOpen, open }) => {
	const classes = useStyles();

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Dialog
				className={classes.root}
				open={open}
				aria-labelledby='form-dialog-title'>
				<div className={classes.close}>
					<CardHeader title='All Withdrawal Requests' />
					<div>
						<IconButton aria-label='close' onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</div>
				</div>
				<RequestTable />
			</Dialog>
		</div>
	);
};

export default AllRequest;
