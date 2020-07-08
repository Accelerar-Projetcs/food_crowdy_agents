import React, { useEffect, useState } from 'react';
import TableList from '../../../components/TableList/TableList';
import Approved from './Approved/Approved';
import { makeStyles } from '@material-ui/styles';
import { getUserId } from '../../../utils/localStore';
import { agentProducts } from '../../../utils/FetchData';
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
	const [pendingProducts, setPendingProducts] = useState([]);
	const agentId = getUserId();

	useEffect(() => {
		agentProducts(`/agent/myupload/pending/${agentId}`).then((data) => {
			setPendingProducts(data.data);
		});
	}, [agentId]);
	return (
		<div className={classes.root}>
			<div className={classes.card}>
				<Link to='agent-product-upload' className={classes.link}>
					<Button
						size='medium'
						type='submit'
						color='primary'
						variant='contained'>
						<Add /> Add Products
					</Button>
				</Link>
				<TableList title={'Pending Products'} productsData={pendingProducts} />
			</div>
			<div>
				<Approved />
			</div>
			{/* <div>
				<TableList
					title={'Pending Products'}
					productsData={pendingProducts}
				/>
			</div> */}
		</div>
	);
};

export default Products;
