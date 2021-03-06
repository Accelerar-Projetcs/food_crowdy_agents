import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	},
	word: {
		margin: theme.spacing(2)
	}
}));

export default function BackDropLoader({ text }) {
	const classes = useStyles();
	const [open] = React.useState(true);
	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress color='inherit' />
				<p className={classes.word}>{text}</p>
			</Backdrop>
		</div>
	);
}
