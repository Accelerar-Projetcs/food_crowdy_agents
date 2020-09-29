import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import {
	CardTravel as CardTravelIcon,
	Payment as PaymentIcon,
} from "@material-ui/icons";
import DeliveryDetails from "./DeliveryDetails/DeliveryDetails";
import ReviewDetails from "./Payments/ReviewDetails";
import CartSummary from "./CartSummary/CartSummary";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "90%",
		margin: theme.spacing(2, "auto"),
		display: "flelx",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		padding: theme.spacing(3, 0, 0, 0),
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
	label: {
		margin: theme.spacing(-6, 0, 0, 0),
	},
}));

function getSteps() {
	return [
		{ id: 1, label: "Delivery Details", icon: <CardTravelIcon /> },
		{ id: 2, label: "Payments", icon: <PaymentIcon /> },
	];
}

export default function Checkout({ match }) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutData, setCheckoutData] = useState("");
	const { id } = match.params;
	const steps = getSteps();

	//   useEffect(() => {
	//     if (!cartItem.length) {
	//       history.push("/products/all");
	//     }
	//   }, [cartItem, history]);


	function getCheckoutSteps(step) {
		switch (step) {
			case 0:
				// return <Review data={data} />;
				return (
					<DeliveryDetails
						userId={id}
						setActiveStep={setActiveStep}
						activeStep={activeStep}
						checkoutData={checkoutData}
						setCheckoutData={setCheckoutData}
					/>
				);
			case 1:
				return <ReviewDetails data={checkoutData} />;
			default:
				return "Unknown step";
		}
	}

	return (
		<>
			<Grid container spacing={2}>
				<Grid item md={8} xl={8} sm={12} xs={12}>
					<Paper className={classes.root}>
						<Typography
							className={classes.header}
							variant={"h3"}
							align="center"
							color="primary"
						>
							Welcome To Checkout
            			</Typography>
						<Stepper
							// className={classes.root}
							color="secondary"
							activeStep={activeStep}
							orientation="vertical"
						>
							{steps.map((step, index) => (
								<Step color="secondary" key={step.id}>
									<StepLabel color="secondary">
										<span className={classes.label}> {step.icon}</span>
										<span> {step.label}</span>
									</StepLabel>
									<StepContent color="secondary">
										<div>{getCheckoutSteps(index)}</div>
									</StepContent>
								</Step>
							))}
						</Stepper>
					</Paper>
				</Grid>
				<Grid item md={3} xl={3} sm={12} xs={12}>
					<CartSummary />
				</Grid>
			</Grid>
		</>
	);
}
