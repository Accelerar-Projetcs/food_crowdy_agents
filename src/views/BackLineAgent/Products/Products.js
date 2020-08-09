import React, { useContext } from 'react';
import { contextApi } from '../../../components/context/Context';
import TableList from '../../../components/TableList/TableList';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'grid',
		placeItems: 'center',
		margin: theme.spacing(4)
	},
	card: {
		position: 'relative'
	},
	link: {
		textAlign: 'right',
		position: 'absolute',
		right: '0',
		margin: '3rem  1rem'
	}
}));
const Products = () => {
	const classes = useStyles();
	const { pendingProducts } = useContext(contextApi);

	return (
		<div className={classes.root}>
			<div className={classes.card}>
				<Link to='agent-product-upload' className={classes.link}>
					<Button
						size='medium'
						type='submit'
						color='primary'
						variant='contained'>
						<Add /> Add New Offers
					</Button>
				</Link>
				<TableList title={'Pending Products'} Products={pendingProducts} />
			</div>
			{/* <div>
				<TableList title={'Approved Products'} Products={approvedProducts} />
			</div> */}
		</div>
	);
};

export default Products;
