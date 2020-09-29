import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@material-ui/icons';
import {
	TextField
} from '@material-ui/core/';
import { formatter } from '../../../utils/localStore';
import AddToCartForm from '../ProductDetails/AddToCartForm/AddToCartForm';
import { Rating } from '@material-ui/lab';


export default function ProductCard({ item }) {
	const [open, setopen] = useState(false);
	const [price, setPrice] = useState({
		displayPrice: "",
		marketPrice: "",
		conversionType: "",
		conversionUnit: "",
	});




	const handleChange = (e) => {
		const filterItem = item.measurement.filter(
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

		if (item && item.measurement) {
			setPrice({
				displayPrice: item.measurement[0].displayPrice,
				marketPrice: item.measurement[0].marketPrice,
				conversionType: item.measurement[0].conversionType,
				conversionUnit: item.measurement[0].conversionUnit,
			});
		}

	}, [item, item.measurement]);

	return (
		<>

			<div className='product-card'>
				<div className='badge'>- {Math.ceil(
					((price.marketPrice - price.displayPrice) /
						price.marketPrice) *
					100
				)} %</div>
				<Link
					to={`/agents/frontline/products-details/${item.category}/${item.title}/${item._id}`}>
					<div className='product-tumb'>
						<img src={item.imagePath} alt={item.farmerName} />
					</div>
				</Link>
				<div className='product-details'>
					<span className='product-catagory'>{item.category}</span>
					<h4>{item.title}</h4>
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
							{item.measurement.map((type) => (
								<option
									key={type.conversionType}
									value={type.conversionType}
								>
									{`Per ${type.conversionType}`}
								</option>
							))}
						</TextField>
					</div>
					<Rating name={item.title} value={5} />
					<div className='product-bottom-details'>
						<div className='product-price'>
							<small>{formatter.format(price.marketPrice)}</small>
							{formatter.format(price.displayPrice)}
						</div>
						<div className='product-links'>
							<ShoppingCartOutlined onClick={() => setopen(true)} />
						</div>
					</div>
				</div>
				<AddToCartForm data={item} price={price} open={open} setOpen={setopen} />
			</div>
		</>
	);
}
