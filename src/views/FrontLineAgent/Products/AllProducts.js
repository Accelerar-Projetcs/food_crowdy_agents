import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@material-ui/icons';
import {
	CardHeader,
	Divider,
	CardActions,
	Grid,
	Card,
	makeStyles
} from '@material-ui/core/';
import { formatter } from '../../../utils/localStore';
import BackDrop from '../../../components/BackDrop/BackDrop';
import Pagination from '../../../components/Pagination/Pagination';
import { allProductsStyles } from './styles/Styles';
import AddToCartForm from '../ProductDetails/AddToCartForm/AddToCartForm';
import { Rating } from '@material-ui/lab';
import { Product as EmptyList } from '../../../components/EmptyList/EmptyList';

const useStyles = makeStyles((theme) => allProductsStyles(theme));

export default function AllProducts({ data = [], loading }) {
	const [offset, setOffset] = useState(0);
	const [open, setOpen] = useState(false);
	const [cartItem, setCartItem] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const classes = useStyles();
	const pageLimit = 6;

	const handleOpen = (product) => {
		setCartItem(product);
		setOpen(true);
	};

	useEffect(() => {}, [data]);

	return (
		<Card className={classes.card}>
			<AddToCartForm data={cartItem} open={open} setOpen={setOpen} />
			<div className={classes.header}>
				<CardHeader title={`(${data.length}) Products`} />
			</div>
			<Divider />
			<Grid container spacing={1}>
				{loading && <BackDrop />}
				{data.length ? (
					data.slice(offset, offset + pageLimit).map((item) => (
						<Grid key={item._id} item lg={4} md={6} xl={8} xs={12}>
							<div className='product-card'>
								<div className='badge'>Hot</div>
								<Link
									to={`/agents/frontline/products-details/${item.category}/${item.title}/${item._id}`}>
									<div className='product-tumb'>
										<img src={item.imagePath} alt={item.farmerName} />
									</div>
								</Link>
								<div className='product-details'>
									<span className='product-catagory'>{item.category}</span>
									<h4>{item.title}</h4>
									<Rating name={item.title} value={5} />
									<div className='product-bottom-details'>
										<div className='product-price'>
											<small>{formatter.format(item.marketPrice)}</small>
											{formatter.format(item && item.rebaseSellingPrice)}
										</div>
										<div className='product-links'>
											<ShoppingCartOutlined onClick={() => handleOpen(item)} />
										</div>
									</div>
								</div>
							</div>
						</Grid>
					))
				) : (
					<EmptyList title={'No item found'} />
				)}
			</Grid>
			<Divider />
			<CardActions>
				<div>
					{data && (
						<Pagination
							data={data.length}
							pageLimit={pageLimit}
							setOffset={setOffset}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					)}
				</div>
			</CardActions>
		</Card>
	);
}
