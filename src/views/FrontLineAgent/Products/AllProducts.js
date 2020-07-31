import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Paginator from 'react-hooks-paginator';
import {
	CardHeader,
	CardContent,
	Typography,
	Grid,
	Divider,
	CardActions,
	Chip,
	TextField
} from '@material-ui/core/';
import { formatter } from '../../../utils/localStore';
import States from '../../../utils/LocationList';
import { FilterList } from '@material-ui/icons';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto',
		'& >*': {
			margin: theme.spacing(0.3, 0)
		}
	},
	cover: {
		width: 151
	},
	price: {
		display: 'block',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		fontWeight: 600
	},
	marketPrice: {
		textDecoration: `line-through`
	},
	playIcon: {
		height: 38,
		width: 38
	},
	card: {
		padding: theme.spacing(1)
	},
	header: {
		display: 'flex',
		justifyContent: `space-between`
	},
	textField: {
		margin: theme.spacing(0, 1)
	}
}));

export default function AllProducts({ data, loading }) {
	const classes = useStyles();
	const pageLimit = 3;
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentData, setCurrentData] = useState([2]);
	useEffect(() => {
		setCurrentData([data].slice(offset, offset + pageLimit));
	}, [offset]);

	return (
		<Card className={classes.card}>
			<div className={classes.header}>
				<CardHeader title='(400) Products' />
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
			{loading && <ProgressBar />}
			<Grid container spacing={1}>
				{data &&
					data.map((item) => (
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
					<Paginator
						totalRecords={data && data.length}
						pageLimit={pageLimit}
						pageNeighbours={2}
						setOffset={setOffset}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						pageActiveClass={'active-btn'}
						pagePrevClass={'active-btn'}
						// pageLinkClass={'active-btn'}
					/>
				</div>
			</CardActions>
		</Card>
	);
}
