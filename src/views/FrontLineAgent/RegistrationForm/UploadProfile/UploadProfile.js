import React, { useContext } from 'react';
import {
	Button,
	CardContent,
	CardHeader,
	Divider,
	makeStyles,
	Typography,
	CardActions
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import UploadInfo from './UploadInfo';
import { FilePond } from 'react-filepond';
import ScrollTop from '../../../../ScrollToTop';
import { Alert } from '@material-ui/lab';
import {
	handleNext,
} from '../../../../Redux/Reducers/FLRegistration/index';
import Styles from './Styles';
import { contextApi } from '../../../../components/context/Context';
import { ArrowRightAltSharp as ForwardIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => Styles(theme));
const PersonalDetails = () => {
	const classes = useStyles();
	const { imageFile, setImageFile } = useContext(contextApi);
	const formState = useSelector((state) => state.FLRegistration.step);
	const activeStep = formState.activeStep;
	const dispatch = useDispatch();

	const handleNextAction = () => {
		if (imageFile && imageFile.files.file) {
			const number = activeStep + 1;
			dispatch(handleNext(number));
		} 
	};

	return (
		<>
			<ScrollTop />
			<div className={classes.Card}>
				<CardHeader
					className={classes.CardHeader}
					title={
						<div>
							<Typography className={classes.text} variant='h5'>
								Upload Photo
							</Typography>
							<Alert severity='info'>
								Please see instructions for picture upload
							</Alert>
						</div>
					}
				/>
				<Divider />
				<form className={classes.root}>
					<CardContent>
						<div>
							<FilePond
								className={classes.img}
								allowFileSizeValidation={true}
								maxFileSize={'500KB'}
								allowMultiple={false}
								maxFiles={1}
								required
								labelMaxFileSize={'Maximum file size is 500KB'}
								onremovefile={(file) => {
									setImageFile('');
								}}
								onupdatefiles={(fileItems) => {
									setImageFile({
										files: fileItems[0]
									});
								}}
							/>
							<UploadInfo />
						</div>
					</CardContent>
					<Divider />
					<CardActions>
						<Button
							type="submit"
							variant='contained'
							color='primary'
							onClick={handleNextAction}
							endIcon={<ForwardIcon />}
							className={classes.button}>
							Continue
						</Button>
					</CardActions>
				</form>
			</div>
		</>
	);
};

export default PersonalDetails;
