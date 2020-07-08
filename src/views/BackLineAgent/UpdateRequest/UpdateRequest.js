import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { agentApi } from '../../../server/Server';
import PropType from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		margin: ' 0  0 4rem 0'
	},
	grid: {
		height: '100%'
	},
	quoteContainer: {
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},
	quote: {
		backgroundColor: theme.palette.neutral,
		height: '100%',
		display: 'flex',
		justifyContent: 'left',
		textAlign: 'left',
		alignItems: 'center'
	},
	quoteInner: {
		textAlign: 'center',
		flexBasis: '600px'
	},
	quoteText: {
		color: theme.palette.white,
		fontWeight: 300
	},
	name: {
		marginTop: theme.spacing(3),
		color: theme.palette.white
	},
	bio: {
		color: theme.palette.white
	},
	contentContainer: {},
	content: {
		height: '100%',
		marginTop: theme.spacing(1)
		// marginBottom:theme.spacing(8)
		// display: 'flex',
		// flexDirection: 'column'
	},
	contentHeader: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: theme.spacing(5),
		paddingBototm: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	logoImage: {
		marginLeft: theme.spacing(4)
	},
	contentBody: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'center'
		}
	},
	form: {
		paddingLeft: 100,
		paddingRight: 100,
		paddingBottom: 125,
		flexBasis: 700,
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		}
	},
	title: {
		marginTop: theme.spacing(3)
	},
	textField: {
		marginTop: theme.spacing(2)
	}
}));
const formatter = new Intl.NumberFormat('en-NG', {
	style: 'currency',
	currency: 'NGN'
});

const UpdateRequest = ({ match }) => {
	const [loadinggbtn, setLoadingbtn] = useState(false);
	const [data, setData] = useState({});
	const history = useHistory();
	const [productDetails, setProductDetails] = useState({
		newUnitPrice: ' ',
		newBulkPrice: '',
		comment: ''
	});
	const classes = useStyles();

	const handleChange = (key, value) => {
		setProductDetails({ ...productDetails, [key]: value });
	};
	const lastLink = () => history.goBack();
	const updateProduct = async (e) => {
		e.preventDefault();
		setLoadingbtn(true);
		console.log(productDetails);
		try {
			await agentApi.post(
				`agent/myupload/updaterequest/${match.params.id}`,
				productDetails
			);
			toast.success('request sent', {
				position: toast.POSITION.TOP_RIGHT
			});
			history.replace('/agents/all-products');
		} catch (error) {
			console.log({ error });
			toast.error('Theres a problem sending your request', {
				position: toast.POSITION.TOP_RIGHT
			});
		}
		setLoadingbtn(false);
	};
	useEffect(() => {
		(async () => {
			try {
				const res = await agentApi.get(
					`/agent/myupload/updaterequest/${match.params.id}`
				);
				setData(res);
			} catch (error) {}
		})();
	}, [match]);

	return (
		<div className={classes.root}>
			<Grid className={classes.grid} container>
				<Grid className={classes.quoteContainer} item lg={5}>
					<div className={classes.quote}>
						<div className={classes.quoteInner}>
							<Typography className={classes.quoteText} variant='h5'>
								Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
								they sold out High Life.
							</Typography>
							<div className={classes.person}>
								<Typography className={classes.name} variant='body1'>
									Takamaru Ayako
								</Typography>
								<Typography className={classes.bio} variant='body2'>
									Manager at inVision
								</Typography>
							</div>
						</div>
					</div>
				</Grid>
				<Grid className={classes.content} item lg={7} xs={12}>
					<div className={classes.content}>
						<div className={classes.contentBody}>
							<form className={classes.form} onSubmit={updateProduct}>
								<ArrowBackIcon onClick={lastLink}>Go Back</ArrowBackIcon>
								<Typography className={classes.title} variant='h5'>
									Request For Product Update
								</Typography>
								<Typography color='textSecondary' gutterBottom>
									let the admin why you want to change price
								</Typography>
								<TextField
									className={classes.textField}
									type='text'
									name='unit-price2'
									id='unit-price2'
									value={formatter.format(data.price)}
									disabled
									fullWidth
									label='old Unit Price'
									onChange={handleChange}
									variant='outlined'
								/>
								<TextField
									className={classes.textField}
									type='text'
									name='bulkPrice2'
									id='bulkPrice2'
									value={formatter.format(data.bulkPrice)}
									disabled
									fullWidth
									label='old Bulk Price'
									onChange={handleChange}
									variant='outlined'
								/>
								<TextField
									fullWidth
									className={classes.textField}
									required
									type='number'
									name='unit-price'
									id='unit-price'
									label='new Unit Price'
									value={productDetails.newUnitPrice}
									onChange={(e) => handleChange('newUnitPrice', e.target.value)}
									variant='outlined'
								/>
								<TextField
									fullWidth
									className={classes.textField}
									required
									type='number'
									name='bulkPrice'
									id='bulkPrice'
									value={productDetails.newBulkPrice}
									onChange={(e) => handleChange('newBulkPrice', e.target.value)}
									label={'New Bulk Price'}
									variant='outlined'
								/>
								<TextField
									fullWidth
									className={classes.textField}
									name='desc-text'
									required
									id='desc-text'
									label='Write your comment'
									multiline
									rows={6}
									value={productDetails.comment}
									onChange={(e) => handleChange('comment', e.target.value)}
									placeholder='Write your product description in details'
									variant='outlined'
								/>
								<Button
									className={classes.textField}
									type='submit'
									variant='contained'
									fullWidth
									color='primary'
									disabled={loadinggbtn ? true : false}
									style={{ cursor: loadinggbtn ? 'disable' : '' }}>
									MAKE REQUEST
								</Button>
							</form>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

UpdateRequest.PropType = {
	className: PropType.String
};

export default UpdateRequest;
