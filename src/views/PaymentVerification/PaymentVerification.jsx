import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Paper,
	Card,
	CardHeader,
	CardContent,
	Typography,
	Button,
	Divider
} from '@material-ui/core';
import {
	CheckCircleOutline as CheckCircleOutlineIcon,
	Close as CloseIcon
} from '@material-ui/icons';
import Styles from './Styles';
import Backdrop from '../../components/BackDrop/BackDrop';
import qs from 'query-string';
import { agentApi } from '../../server/Server';
import { errorHandler } from '../../errors/errorHandler';
import { useDispatch } from 'react-redux';
import { removeAllCartItem } from '../../Redux/Reducers/Cart';

const useStyles = makeStyles((theme) => Styles(theme));

const PaymentVerification = ({ location, history }) => {
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const TRANSACTION_REF = qs.parse(location.search);
				const tx_ref = TRANSACTION_REF['tx_ref'];
				if (tx_ref) {
					const res = await agentApi.get(`/payment-status/${tx_ref}`);
					if (res.data && res.data.status === 'successful') {
						setSuccess(true);
					} else {
						setError(true);
					}
				}
			} catch (error) {
				errorHandler(error);
				setSuccess(true);
				dispatch(removeAllCartItem());
			}
			setLoading(false);
		})();
	}, [location.search, dispatch]);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Card className={classes.card}>
					<CardHeader title='Transaction Verification' />
					<Divider />
					<CardContent>
						{loading && <Backdrop load={loading} />}
						{success && (
							<Fragment>
								<CheckCircleOutlineIcon className={classes.icon} />
								<Typography variant='body1'>Transaction successful</Typography>
								<Typography variant='body1' className={classes.link}>
									Your order is been processed you will be contacted for
									delivery
								</Typography>
								<Button
									className={classes.btn}
									onClick={() => {
										history.push('/customer/account/myorders');
									}}
									color='inherit'
									variant='contained'>
									See order
								</Button>
							</Fragment>
						)}
						{error && (
							<Fragment>
								<CloseIcon className={classes.icon2} />
								<Typography variant='body1'>Transaction failed</Typography>
							</Fragment>
						)}
					</CardContent>
				</Card>
			</Paper>
		</div>
	);
};

export default PaymentVerification;
