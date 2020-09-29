import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AllProducts from './AllProducts';
import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	TextField,
	Divider,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@material-ui/core';
import useAgent from '../../../hooks/useAgent';
import ctimage from '../../../assets/images/category.svg';
import { category as productCategory } from '../../../utils/ProductsCategory';
import { categoryStyles } from './styles/Styles';

const useStyles = makeStyles((theme) => categoryStyles(theme));

const ProductCategory = () => {
	const [category, setcategory] = useState('');
	const [searchQuery, setsearchQuery] = useState('');
	const { data, loading } = useAgent(`/products/`);
	const classes = useStyles();


	const searchCategoryHandle = (e) => {
		setcategory(e.target.value);
	};

	const searchQueryHandle = (e) => {
		setsearchQuery(e.target.value);
	};
	const filteredData = (data) => {
		let modifiedData = data;
		if (data) {
			if (category) {
				modifiedData = modifiedData.filter(
					(item) => item.category.toLowerCase().includes(category.toLowerCase())
				);
			}
			if (searchQuery) {
				modifiedData = modifiedData.filter((item) =>
					item.title.toLowerCase().includes(searchQuery.toLowerCase())
				);
			}
		}
		return modifiedData;
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item lg={3} md={6} xl={4} xs={12}>
					<Card>
						<CardHeader
							title={
								<h5 style={{ margin: '.2rem 0' }}>
									<img src={ctimage} height='30' alt='categories' />
									Search By Category
								</h5>
							}
						/>
						<Divider />
						<CardContent>
							<TextField
								fullWidth
								label='Search content'
								margin='dense'
								onChange={searchQueryHandle}
								name='searchitem'
								variant='outlined'
							/>
						</CardContent>
						<CardContent>
							<FormControl component='fieldset'>
								<RadioGroup
									aria-label='foodCategory'
									name='category'
									value={category}
									onChange={searchCategoryHandle}>
									<FormControlLabel
										value={''}
										control={<Radio />}
										label='All Product'
									/>
									{productCategory.map((category) => (
										<FormControlLabel
											value={category.value}
											key={category.value}
											control={<Radio />}
											label={category.label}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={9} md={6} xl={8} xs={12}>
					<AllProducts data={filteredData(data)} loading={loading} />
				</Grid>
			</Grid>
		</div>
	);
};

export default ProductCategory;
