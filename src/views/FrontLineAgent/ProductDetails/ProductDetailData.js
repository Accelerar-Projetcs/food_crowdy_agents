import React, { useState, useEffect } from 'react';
import { Grid, Typography, Chip, Divider, Button, TextField, makeStyles } from '@material-ui/core';
import AddToCartForm from './AddToCartForm/AddToCartForm';
import { formatter } from '../../../utils/localStore';
import { productsDataStyles } from './styles/Styles';

const useStyles = makeStyles((theme) => productsDataStyles(theme));

const ProductDetailData = ({ data, loading }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const [price, setPrice] = useState({
		displayPrice: "",
		marketPrice: "",
		conversionType: "",
		conversionUnit: "",
	});

	const handleChange = (e) => {
		const filterItem = data.measurement.filter(
			(item) => item.conversionType === e.target.value
		);
		setPrice({
			displayPrice: filterItem[0].displayPrice,
			marketPrice: filterItem[0].marketPrice,
			conversionType: filterItem[0].conversionType,
			conversionUnit: filterItem[0].conversionUnit,
		});
	};


	useEffect(() => {
		if (data && data.measurement) {
			setPrice({
				displayPrice: data.measurement[0].displayPrice,
				marketPrice: data.measurement[0].marketPrice,
				conversionType: data.measurement[0].conversionType,
				conversionUnit: data.measurement[0].conversionUnit,
			});
		}
		//eslint-disable-next-line
	}, [data]);

	const handleOpen = () => {
		setOpen(true);
	};

	const ProductDetails = (<React.Fragment>
		<AddToCartForm data={data} open={open} price={price} setOpen={setOpen} />
		{data && data.measurement && (
			<Grid container className={classes.content} spacing={3}>
				<Grid item lg={4} md={12} xl={6} xs={10}>
					<div className={classes.imageCard}>
						{console.log('show ok')}
						<img
							className={classes.image}
							width="250"
							src={data.image.secureUrl}
							// src={!data.isSoldOut ? data.image.secureUrl : 'SoldOutImg'}
							alt={data.title}
						/>
					</div>

				</Grid>
				<Grid item lg={6} md={12} xl={6} xs={10}>
					<div className={classes.description}>
						<div className={classes.title}>
							<Typography variant='h3'>{data.title}</Typography>
							{/* <Rating value={5} /> */}
						</div>
						<Chip className={classes.chip} label={data.category} />
						<div>
							<TextField
								className="product-select"
								select
								color="secondary"
								size="small"
								variant="outlined"
								id="demo-simple-select-outlined"
								onChange={handleChange}
								SelectProps={{
									name: "type",
									native: true,
								}}
							>
								{data.measurement.map((type) => (
									<option
										key={type.conversionType}
										value={type.conversionType}
									>
										{`Per ${type.conversionType}`}
									</option>
								))}
							</TextField>
						</div>
						<div className={classes.message}>

							<Grid container className={classes.details}>
								<Grid item lg={6} md={12} xl={6} xs={10}>
									<p className={classes.priceTitle}>Our Price</p>
									<p className={classes.price}>
										{formatter.format(price.displayPrice)}
									</p>
								</Grid>
								<Grid item lg={6} md={12} xl={6} xs={10}>
									<p className={classes.priceTitle}>Market Price</p>
									<p className={classes.price}>
										{formatter.format(price.marketPrice)}
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
	</React.Fragment>)
	return (
		<>
			{ data && data.measurement ? (ProductDetails) : <h1>dj xc nmxcn</h1>}	</>

	);
};

export default ProductDetailData;
