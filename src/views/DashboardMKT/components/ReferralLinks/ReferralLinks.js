import React, { useState } from 'react';
import { Paper, Button, Grid, makeStyles } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Style from './Style';
import { PUBLIC_URL, PUBLIC_URL_MAIN } from '../../../../constants/HostUrl';
import { userData } from '../../../../utils/GetUserData';

const useStyles = makeStyles((theme) => Style(theme));

const ReferralLinks = () => {
	const [copy, setcopy] = useState(false);
	const [copy2, setcopy2] = useState(false);
	const classes = useStyles();
	const marketerId = userData('uniqueId');

	return (
		<Paper className={classes.root}>
			<div className={classes.block}>
				{/* <Typography className={classes.header} variant='h5'>
					{' '}
					Referral link
				</Typography> */}
				<Grid container spacing={4}>
					<Grid item lg={4} sm={12} xl={6} xs={12}>
						<label className={classes.label} htmlFor='agents-link'>
							Agents
						</label>
						<input
							className={classes.input}
							type='text'
							id='agents-link'
							readOnly
							value={`${PUBLIC_URL}/agents/frontline/registration?referralId=${marketerId}`}
						/>
						<CopyToClipboard
							text={`${PUBLIC_URL}/agents/frontline/registration?referralId=${marketerId}`}
							onCopy={() => setcopy2(!copy2)}>
							<Button
								variant='outlined'
								size='small'
								className={classes.Btn}
								color='primary'>
								{copy2 ? 'Copied!' : 'Copy'}
							</Button>
						</CopyToClipboard>
					</Grid>
					<Grid item lg={4} sm={12} xl={6} xs={12}>
						<label className={classes.label} htmlFor='customer-link'>
							Customers
						</label>
						<input
							className={classes.input}
							type='text'
							readOnly
							id='customer-link'
							value={`${PUBLIC_URL_MAIN}/customer/account/register?referralId=${marketerId}`}
						/>
						<CopyToClipboard
							text={`${PUBLIC_URL_MAIN}/customer/account/register?referralId=${marketerId}`}
							onCopy={() => setcopy(!copy)}>
							<Button
								variant='outlined'
								size='small'
								className={classes.Btn}
								color='primary'>
								{copy ? 'Copied!' : 'Copy'}
							</Button>
						</CopyToClipboard>
					</Grid>
				</Grid>
			</div>
		</Paper>
	);
};

export default ReferralLinks;
