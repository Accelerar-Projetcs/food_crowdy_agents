import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm/AddressForm';
import Review from './ReviewOrder/ReviewOrder';
import DeliveryMethod from './DeliveryProcess/DeliveryProcess';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative'
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	stepper: {
		padding: theme.spacing(3, 0, 5)
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	}
}));

const steps = ['Delivery Method', 'Review your order'];

export default function Checkout({ match }) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutData, setcheckoutData] = useState({});
	const { id } = match.params;
	console.log(checkoutData);
	console.log(id);

	function getStepContent(id, step, activeStep, setActiveStep, checkoutData) {
		switch (step) {
			case 0:
				return (
					<DeliveryMethod
						userId={id}
						checkoutData={checkoutData}
						setcheckoutData={setcheckoutData}
						activeStep={activeStep}
						setActiveStep={setActiveStep}
					/>
				);
			case 1:
				return <Review checkoutData={checkoutData} />;
			default:
				return 'unknown';
		}
	}

	return (
		<React.Fragment>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component='h1' variant='h4' align='center'>
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant='h5' gutterBottom>
									Thank you for your order.
								</Typography>
								<Typography variant='subtitle1'>
									Your order number is #2001539. We have emailed your order
									confirmation, and will send you an update when your order has
									shipped.
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(
									id,
									activeStep,
									setActiveStep,
									checkoutData,
									setcheckoutData
								)}
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}
