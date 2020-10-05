import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Typography,
	makeStyles,
	Divider
} from '@material-ui/core/';
import { ArrowRightAltSharp as InfoIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: 'inline'
	}
}));

export default function AlignItemsList() {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			<Typography variant={'h5'}>
				Take a picture of yourself holding the following visibly
			</Typography>
			<ListItem alignItems='center'>
				<ListItemIcon>
					<InfoIcon />
				</ListItemIcon>
				<ListItemText
					primary='Government issued Id card'
					secondary={
						<React.Fragment>
							<Typography
								component='span'
								variant='body2'
								className={classes.inline}
								color='textPrimary'>
								This card used to fill registration form. The Id should show
							</Typography>
							{/* <ol>
								<li>Name</li>
								<li>Id Number</li>
								<li>Expiry Date</li>
							</ol> */}
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant='inset' component='li' />
			{/* <ListItem alignItems='flex-start'>
				<ListItemIcon>
					<InfoIcon />
				</ListItemIcon>
				<ListItemText
					primary='Received Code'
					secondary={
						<Typography
							component='span'
							variant='body2'
							className={classes.inline}
							color='textPrimary'>
							Code sent you your mail or phone nuber written on a piece of paper
						</Typography>
					}
				/>
			</ListItem> */}
		</List>
	);
}
