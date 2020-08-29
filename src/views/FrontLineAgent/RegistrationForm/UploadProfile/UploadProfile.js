import React, { useState } from 'react';
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
import {
	handleNext,
	pictureUpload
} from '../../../../Redux/Reducers/FLRegistration/index';
import UploadInfo from './UploadInfo';
import { FilePond } from 'react-filepond';
import ScrollTop from '../../../../ScrollToTop';
import { Alert } from '@material-ui/lab';
import Styles from './Styles';

const useStyles = makeStyles((theme) => Styles(theme));

const PersonalDetails = () => {
	const classes = useStyles();
	const [imageFile, setImageFile] = useState({ files: '' });
	const formState = useSelector((state) => state.FLRegistration.step);
	const activeStep = formState.activeStep;
	const dispatch = useDispatch();

	const handleNextAction = () => {
		const {
			files: { file }
		} = imageFile;
		if (imageFile) {
			const number = activeStep + 1;
			dispatch(handleNext(number));
			// dispatch(pictureUpload(file));
		}
		return;
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
								allowMultiple={true}
								maxFiles={10}
								name={'file'}
								required={true}
								allowFileSizeValidation={true}
								maxTotalFileSize={100}
								labelMaxTotalFileSize={
									'Total file size should be lesser than 5MB.'
								}
								allowFileTypeValidation={true}
								acceptedFileTypes={['image/jpeg']}
								fileValidateTypeLabelExpectedTypesMap={{
									// 'application/pdf': '.pdf',
									'image/jpeg': '.jpg'
								}}
								labelFileTypeNotAllowed={'Upload only PDF or JPEG file.'}
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
							variant='contained'
							color='primary'
							onClick={handleNextAction}
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
