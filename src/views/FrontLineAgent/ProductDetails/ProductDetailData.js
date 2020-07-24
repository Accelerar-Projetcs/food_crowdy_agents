import React, { useState } from 'react';
import { Grid, Typography, Chip, Divider, Button } from '@material-ui/core';
import DialogToAddUser from './DialogForAdding';
import { Rating, Alert, AlertTitle } from '@material-ui/lab';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { makeStyles } from '@material-ui/styles';
import { formatter } from '../../../utils/localStore';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: `.4rem`
	},
	content: {
		background: theme.palette.background.paper,
		margin: theme.spacing(2, 0),
		padding: theme.spacing(1)
		// width: '95%'
	},
	description: {
		'& >*': {
			margin: theme.spacing(1)
		}
	},
	btnOrange: {
		background: theme.palette.tetiary.main,
		color: theme.palette.white
	},
	details: {
		'& > *': {
			margin: theme.spacing(2, 0)
		}
	},
	price: {
		fontWeight: 600,
		fontSize: '1.2rem '
	},
	priceTitle: {
		color: theme.palette.tetiary.main
	},
	buyBtn: {
		margin: theme.spacing(1, 0)
	},
	chip: {
		background: theme.palette.tetiary.main,
		color: theme.palette.white
	},
	slots: {
		fontSize: '1.2rem',
		margin: theme.spacing(2, 0)
	},
	slotNum: {
		color: theme.palette.primary.main,
		fontWeight: 600
	},
	image: {
		width: '100%'
	},
	icon: {
		margin: `-.4rem 0`
	}
}));

const ProductDetailData = ({ data }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const handleClickOpen = () => {
		setOpen(!open);
	};

	// const handleClose = () => {
	// 	setOpen(false);
	// };
	console.log(data);

	return (
		<React.Fragment>
			<DialogToAddUser open={open} setOpen={setOpen} />
			{data && (
				<Grid container className={classes.content} spacing={8}>
					<Grid item lg={4} md={12} xl={6} xs={10}>
						<div className={classes.imageCard}>
							<img
								className={classes.image}
								height='250'
								width='350'
								src={data.imagePath}
								alt={data.title}
							/>
							<div className={classes.slots}>
								<span className={classes.slotTitle}>
									<StorefrontIcon className={classes.icon} />
									Available Slots :
								</span>
								<span className={classes.slotNum}>
									<strong>{data.availableUnits}</strong>
								</span>
							</div>
							{/* <Divider /> */}
							{/* <div className={classes.slots}>
								<span className={classes.slotTitle}>
									<StorefrontIcon className={classes.icon} />
									Remaining Slots
								</span>
								<span className={classes.slotNum}>
									<strong>10</strong>
								</span>
							</div> */}
							<Divider />
						</div>
					</Grid>
					<Grid item lg={6} md={12} xl={6} xs={10}>
						<div className={classes.description}>
							<div className={classes.title}>
								<Typography variant='body2'>{data.title}</Typography>
								<Rating name={data.title} value={3} />
							</div>
							<Chip className={classes.chip} label={data.category} />
							<div className={classes.message}>
								<Alert severity='info'>
									<AlertTitle>Info</AlertTitle>
									Join This ongoing <br />
									We have limited slots available <br />
									<strong>Add a buyer to this user</strong>
								</Alert>
								<Grid container className={classes.details}>
									<Grid item lg={6} md={12} xl={6} xs={10}>
										<p className={classes.priceTitle}>Our Price</p>
										<p className={classes.price}>
											{formatter.format(data.rebaseSellingPrice)}
										</p>
									</Grid>
									<Grid item lg={6} md={12} xl={6} xs={10}>
										<p className={classes.priceTitle}>Market Price</p>
										<p className={classes.price}>
											{formatter.format(data.marketPrice)}
										</p>
									</Grid>
								</Grid>
								<Divider />
								<p>{data.description}</p>
								<Divider />
								{!data.isSoldOut && (
									<Button
										variant='contained'
										className={classes.buyBtn}
										onClick={handleClickOpen}
										color='primary'>
										Add Buyer
									</Button>
								)}
							</div>
						</div>
					</Grid>
				</Grid>
			)}
		</React.Fragment>
	);
};

export default ProductDetailData;
