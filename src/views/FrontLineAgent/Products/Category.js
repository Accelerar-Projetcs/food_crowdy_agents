import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { ProductsApiHooks } from '../../../server/Server';
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
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	}
}));

const ProductCategory = () => {
	const classes = useStyles();
	const [{ data, loading }] = ProductsApiHooks(`/search/all`);

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item lg={4} md={6} xl={4} xs={12}>
					<Card>
						<CardHeader
							subheader='you can search by category and sort by price'
							title='Search For Products'
						/>
						<Divider />
						<CardContent>
							<TextField
								fullWidth
								label='Search content'
								margin='dense'
								name='searchitem'
								variant='outlined'
							/>
						</CardContent>
						<CardContent>
							<FormControl component='fieldset'>
								<RadioGroup aria-label='foodCategory' name='foodCatergory1'>
									<FormControlLabel
										value='RICE'
										control={<Radio />}
										label='Fish & SeaFood'
									/>
									<FormControlLabel
										value='FRUITS'
										control={<Radio />}
										label='Friuts & Nuts'
									/>
									<FormControlLabel
										value='VEGETABLE'
										control={<Radio />}
										label='Vegetables'
									/>
									<FormControlLabel
										value='CONDIMENTS'
										control={<Radio />}
										label='Condiments'
									/>
									<FormControlLabel
										value='COW'
										control={<Radio />}
										label='Cow,Goat,Chicken'
									/>
									<FormControlLabel
										value='FOODSTUFFS'
										control={<Radio />}
										label='FoodStuffs'
									/>
								</RadioGroup>
							</FormControl>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={8} md={6} xl={8} xs={12}>
					<AllProducts data={data} loading={loading} />
				</Grid>
			</Grid>
		</div>
	);
};

export default ProductCategory;
