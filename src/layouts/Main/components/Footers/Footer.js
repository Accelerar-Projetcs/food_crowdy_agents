import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '50px',
		margin: theme.spacing(45, 0, -20, 0)
	},
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[800]
	}
}));

export default function StickyFooter() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<footer className={classes.footer}>
				<Container maxWidth='sm'>
					<Typography variant='body1'>
						&copy;{' '}
						<Link component='a' href='https://foodcrowdy.com' target='_blank'>
							Food Crowdy
						</Link>
						2020
					</Typography>
					<Copyright />
				</Container>
			</footer>
		</div>
	);
}
