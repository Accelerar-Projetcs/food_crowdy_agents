import React from 'react';
import { makeStyles, Grid } from '@material-ui/core/';
import {
	Facebook as FacebookIcon,
	Twitter as TwitterIcon,
	Instagram as InstagramIcon
} from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '50px',
		// margin: theme.spacing(45, 0, -20, 0)
	},
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
		backgroundColor: theme.palette.grey[700]
	},
	icon: {
		color: theme.palette.white
	},
	bottom: {
		color: theme.palette.white
	},
	link: {
		margin: theme.spacing(0.5, 1)
	}
}));

const Footer = () => {
	const classes = useStyles();
	const date = new Date();
	const currentYear = date.getFullYear();

	return (
		<div className={classes.root}>
			<footer className={classes.footer}>
				<Grid className={classes.bottom} container spacing={4}>
					<Grid item lg={6} md={6} xl={3} xs={12}>
						<p> FoodCrowdy &copy; {currentYear} || All Right Reserved</p>
					</Grid>
					<Grid item lg={6} md={6} xl={3} xs={12}>
						{/* <h6>FOLLOW US ON</h6> */}
						<a
							className={classes.link}
							target='_blanck'
							href='https://www.facebook.com/foodcrowdy/'>
							<FacebookIcon className={classes.icon} />
						</a>
						<a
							className={classes.link}
							target='_blanck'
							href='https://twitter.com/foodcrowdy?s=09'>
							<TwitterIcon className={classes.icon} />
						</a>
						<a
							className={classes.link}
							target='_blanck'
							href='https://www.instagram.com/foodcrowdy/'>
							<InstagramIcon className={classes.icon} />
						</a>
					</Grid>
				</Grid>
			</footer>
		</div>
	);
};

export default Footer;
