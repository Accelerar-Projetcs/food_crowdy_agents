import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { formatter } from '../../../../utils/localStore';
import { Divider } from '@material-ui/core';
import ScrollToTop from '../../../../ScrollToTop';
import PayementForm from '../PayementForm/PaymentForm';

const products = [
	{ name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
	{ name: 'Product 2', desc: 'Another thing', price: '$3.45' },
	{ name: 'Product 3', desc: 'Something else', price: '$6.51' },
	{ name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
	{ name: 'Shipping', desc: '', price: 'Free' }
];
const addresses = [
	'1 Material-UI Drive',
	'Reactville',
	'Anytown',
	'99999',
	'USA'
];
const payments = [
	{ name: 'Card type', detail: 'Visa' },
	{ name: 'Card holder', detail: 'Mr John Smith' },
	{ name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
	{ name: 'Expiry date', detail: '04/2024' }
];

const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(1, 0)
	},
	total: {
		fontWeight: 700
	},
	title: {
		marginTop: theme.spacing(2)
	}
}));

export default function Review({ checkoutData }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<ScrollToTop />
			<Typography variant='h5' gutterBottom>
				<strong>Order summary</strong>
			</Typography>
			<Divider />
			<Typography variant='h6' gutterBottom>
				Chinweikwe Michael
			</Typography>
			<Divider />
			<List disablePadding>
				{products.map((product) => (
					<ListItem className={classes.listItem} key={product.name}>
						<ListItemText primary={product.name} secondary={product.desc} />
						<Typography variant='body2'>{product.price}</Typography>
					</ListItem>
				))}
				<ListItem className={classes.listItem}>
					<ListItemText primary='Delivery Fee' />
					<Typography variant='subtitle1' className={classes.total}>
						{formatter.format(300)}
					</Typography>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary='Total' />
					<Typography variant='subtitle1' className={classes.total}>
						{formatter.format(17000)}
					</Typography>
				</ListItem>
			</List>
			<Divider />
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' gutterBottom className={classes.title}>
						Shipping
					</Typography>
					<Typography gutterBottom>John Smith</Typography>
					<Typography gutterBottom>{addresses.join(', ')}</Typography>
				</Grid>
			</Grid>
			<PayementForm />
		</React.Fragment>
	);
}
