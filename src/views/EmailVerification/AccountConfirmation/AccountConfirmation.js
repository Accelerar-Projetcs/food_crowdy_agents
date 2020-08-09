import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DialogBlock from '../DisableUser/DisableUser';
import { Link } from 'react-router-dom';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Typography
} from '@material-ui/core';
import {
	CheckCircle as CheckCircleIcon,
	ErrorOutline as ErrorOutlineIcon
} from '@material-ui/icons/';
import Style from '../Styles/Styles';

const useStyles = makeStyles((theme) => Style(theme));

const Notification = (icon, message, link) => (
	<Card style={{ textAlign: 'center' }}>
		<CardHeader
			title={<Typography variant='h3'> Account Verification</Typography>}
		/>
		<Divider />
		<CardContent>
			{icon}

			<div>
				<span>{message}</span>
				<br />
				<Link to='/'>{link}</Link>
			</div>
		</CardContent>
	</Card>
);

const AccountConfirmation = () => {
	const classes = useStyles();
	//**Api cal to verify agents email token ***//
	const res = true;
	const SUCCESSFUL_RESPONSE = `Your account has been successfully verified`;
	const ERROR_RESPONSE = `This Link has expired try resend another link `;

	return (
		<div>
			{res ? (
				<DialogBlock
					children={Notification(
						<CheckCircleIcon className={classes.check} />,
						SUCCESSFUL_RESPONSE,
						`Got to dashboard`
					)}
				/>
			) : (
				<DialogBlock
					children={Notification(
						<ErrorOutlineIcon className={classes.pending} />,
						ERROR_RESPONSE,
						`click here to get a new link`
					)}
				/>
			)}
		</div>
	);
};

export default AccountConfirmation;
