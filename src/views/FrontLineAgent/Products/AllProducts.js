import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paginator from 'react-hooks-paginator';
import {
	CardHeader,
	CardContent,
	Typography,
	Divider,
	CardActions,
	Grid,
	Chip,
	TextField,
	Card,
	makeStyles
} from '@material-ui/core/';
import { formatter } from '../../../utils/localStore';
import States from '../../../utils/LocationList';
import { FilterList } from '@material-ui/icons';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import { allProductsStyles } from './styles/Styles';

const useStyles = makeStyles((theme) => allProductsStyles(theme));

export default function AllProducts({ data, loading }) {
	const classes = useStyles();
	const pageLimit = 6;
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {}, [data]);

	return (
		<Card className={classes.card}>
			<div className={classes.header}>
				<CardHeader title={`${data && data.length} Products`} />
				<CardContent>
					<strong>Sort by: </strong> <FilterList />
					<TextField
						className={classes.textField}
						id='outlined-select-state'
						select
						margin='dense'
						label=''
						name='location'
						SelectProps={{
							native: true
						}}
						variant='outlined'>
						{States.map((option) => (
							<option key={option.id} value={option.name}>
								{option.name}
							</option>
						))}
					</TextField>
					<TextField
						className={classes.textField}
						id='outlined-select-state'
						select
						label=''
						name='location'
						margin='dense'
						SelectProps={{
							native: true
						}}
						variant='outlined'>
						{['high-low', 'low-high'].map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</TextField>
				</CardContent>
			</div>

			<Divider />

			<Grid container spacing={1}>
				{loading && <ProgressBar />}
				{data &&
					data.slice(offset, offset + pageLimit).map((item) => (
						<Grid key={item._id} item lg={6} md={6} xl={8} xs={12}>
							<Link
								to={`/agents/frontline/products-details/${item.category}/${item.title}/${item._id}`}>
								<Card>
									<div className={classes.root}>
										<img
											className={classes.cover}
											src={item.imagePath}
											alt={item.farmerName}
											height='100'
										/>
										<div className={classes.details}>
											<CardContent className={classes.content}>
												<Typography component='h5' variant='h5'>
													Live From Space
												</Typography>
												<Chip label={item.category} color='primary' />
											</CardContent>
										</div>
									</div>
									<Divider />
									<div className={classes.price}>
										<Typography variant='subtitle1' color='textSecondary'>
											Our Price :{' '}
											{formatter.format(item && item.rebaseSellingPrice)}
										</Typography>
										<br />
										<Typography
											className={classes.marketPrice}
											variant='subtitle1'
											color='textSecondary'>
											Market Price :{formatter.format(item.marketPrice || 0)}
										</Typography>
									</div>
								</Card>
							</Link>
						</Grid>
					))}
			</Grid>
			<Divider />
			<CardActions>
				<div>
					{data && (
						<Paginator
							totalRecords={data.length}
							pageLimit={pageLimit}
							pageNeighbours={2}
							setOffset={setOffset}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							pageActiveClass={'active-btn'}
							pagePrevClass={'active-btn'}
							// pageLinkClass={'active-btn'}
						/>
					)}
				</div>
			</CardActions>
		</Card>
	);
}
