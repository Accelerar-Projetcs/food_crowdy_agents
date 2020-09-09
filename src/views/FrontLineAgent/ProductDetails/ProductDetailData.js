import React, { useState } from 'react';
import { Grid, Typography, Chip, Divider, Button } from '@material-ui/core';
import AddToCartForm from './AddToCartForm/AddToCartForm';
import { AlertTitle, Alert } from '@material-ui/lab';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { makeStyles } from '@material-ui/styles';
import { formatter } from '../../../utils/localStore';
import { productsDataStyles } from './styles/Styles';

const useStyles = makeStyles((theme) => productsDataStyles(theme));

const ProductDetailData = ({ data }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<React.Fragment>
			<AddToCartForm data={data} open={open} setOpen={setOpen} />
			{data && (
				<Grid container className={classes.content} spacing={3}>
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
							<Divider />
						</div>
					</Grid>
					<Grid item lg={6} md={12} xl={6} xs={10}>
						<div className={classes.description}>
							<div className={classes.title}>
								<Typography variant='h3'>{data.title}</Typography>
								{/* <Rating value={5} /> */}
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
										onClick={handleOpen}
										color='primary'>
										Add To Cart
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
