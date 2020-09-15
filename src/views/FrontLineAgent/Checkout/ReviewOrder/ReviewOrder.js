import React from 'react';
import {
	makeStyles,
	Typography,
	List,
	ListItem,
	ListItemText,
	Grid,Divider
} from '@material-ui/core/';
import { formatter } from '../../../../utils/localStore';
import ScrollToTop from '../../../../ScrollToTop';
import PayementForm from '../PayementForm/PaymentForm';

const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(1, 0)
	},
	total: {
		fontWeight: 700
	},
	title: {
		marginTop: theme.spacing(2),
		fontWeight: 600
	}
}));

export default function Review({ checkoutData }) {
	const {
		products,
		orderReference,
		deliveryFee,
		total,
		address,
		user: { name }
	} = checkoutData;
	const classes = useStyles();

	return (
		<React.Fragment>
			<ScrollToTop />
			<Typography variant='h5' gutterBottom>
				<strong>Order summary</strong>
			</Typography>
			<Typography variant='h6' gutterBottom>
				<strong>Order NO : {orderReference}</strong>
			</Typography>
			<Divider />
			<Typography variant='h6' gutterBottom>
				{name}
			</Typography>
			<Divider />
			<List disablePadding>
				{products.map((product) => (
					<ListItem className={classes.listItem} key={product.id}>
						<ListItemText primary={product.title} />
						<Typography variant='body2'>
							{formatter.format(product.unitPrice)}
						</Typography>
					</ListItem>
				))}
				<ListItem className={classes.listItem}>
					<ListItemText primary='Delivery Fee' />
					<Typography variant='subtitle1' className={classes.total}>
						{formatter.format(deliveryFee)}
					</Typography>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary='Total' />
					<Typography variant='subtitle1' className={classes.total}>
						{formatter.format(total)}
					</Typography>
				</ListItem>
			</List>
			<Divider />
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' gutterBottom className={classes.title}>
						Shipping:
					</Typography>
					<Typography gutterBottom>User: {name}</Typography>
					<Typography gutterBottom>Address: {address}</Typography>
				</Grid>
			</Grid>
			{checkoutData && checkoutData.user && (
				<PayementForm paymentData={checkoutData} />
			)}
		</React.Fragment>
	);
}
