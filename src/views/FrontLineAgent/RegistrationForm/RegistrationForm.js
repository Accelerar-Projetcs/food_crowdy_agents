import React from 'react';
import {
	makeStyles,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography
} from '@material-ui/core/';
import { useSelector } from 'react-redux';

import PersonalInformation from './PersonalDetails/PersonalDetails';
import Businessinformation from './BusinessInformation/BusinessInformation';
import GuarantorsInformation from './Guarantor/Guarantor';
import Declaration from './Declaration/Declaration';

import imgLogo from '../../../assets/images/logoFood.svg';
import Styles from './Styles';
import UploadPicture from './UploadProfile/UploadProfile';
import Acknowledgement from './Acknowledgement/Acknowledge';

const useStyles = makeStyles((theme) => Styles(theme));

const steps = [
	'Personnal information',
	'Upload Profile',
	'Business Information',
	'Guarantors Information',
	'Declaration'
];

export default function Registration() {
	const formState = useSelector((state) => state.FLRegistration.step);
	// const formState2 = useSelector((state) => state.FLRegistration);
	const activeStep = formState.activeStep;
	const classes = useStyles();

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return <PersonalInformation />;
			// return <GuarantorsInformation />;
			// return <Declaration />;
			// return <Businessinformation />;
			// return <UploadPicture />;
			case 1:
				return <UploadPicture />;
			case 2:
				return <Businessinformation />;
			case 3:
				return <GuarantorsInformation />;
			case 4:
				return <Declaration />;
			default:
				return;
		}
	};

	
	return (
		<React.Fragment>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component='h1' variant='h4' align='center'>
						<img height={30} src={imgLogo} alt='foodCrowdy' /> FrontLine Agents
						Registration
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel className={classes.stepperList}>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<Acknowledgement />
						) : (
							<React.Fragment>{getStepContent(activeStep)}</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}
