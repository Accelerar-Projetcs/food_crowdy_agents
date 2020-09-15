import React, { useState } from 'react';
import moment from 'moment';
import {
	makeStyles,
	Box,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Paper,
	CardHeader,
	Card
} from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableHeader from '../Table/TableHeader';
import { formatter } from '../../../../utils/localStore';
import StatusBullet from '../../../../components/StatusBullet/StatusBullet';
import { statusColors } from '../../../../utils/StatusColors';
import Pagination from '../../../../components/Pagination/Pagination';
import EmptyList from '../../../../components/EmptyList/EmptyList';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset'
		}
	}
});

const data = [
	{
		orderReference: 'TGGHJ3983983',
		paymentStatus: 'failed',
		email: 'infinity',
		deliveryStatus: 'pending',
		createdAt: Date.now(),
		total: 383983,
		customer: 'michael',
		products: [
			{
				title: 'rice',
				unitPrice: 100,
				quantity: 2
			}
		]
	}
];
function Row(props) {
	const { row } = props;
	const [open, setOpen] = useState(false);
	const classes = useRowStyles();

	return (
		<>
			<TableRow className={classes.root}>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{row.orderReference}</TableCell>
				<TableCell>{row.customer}</TableCell>
				<TableCell>
					{row.deliveryStatus}
					{
						<StatusBullet
							size={'sm'}
							color={statusColors[row.deliveryStatus]}
						/>
					}
				</TableCell>
				<TableCell>
					{row.paymentStatus}
					{<StatusBullet size={'sm'} color={statusColors[row.paymentStatus]} />}
				</TableCell>
				<TableCell>{row.email}</TableCell>
				<TableCell>{row.total}</TableCell>
				<TableCell>{moment(row.createdAt).format('LL')}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box margin={1}>
							<Typography variant='h6' gutterBottom component='div'>
								Products Details
							</Typography>
							<Table size='small' aria-label='purchases'>
								<TableHead>
									<TableRow>
										<TableCell>Title</TableCell>
										<TableCell>unit Price</TableCell>
										<TableCell>Quantity</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.products.map((item) => (
										<TableRow key={item._id}>
											<TableCell component='th' scope='row'>
												{item.title}
											</TableCell>
											<TableCell>{formatter.format(item.unitPrice)}</TableCell>
											<TableCell>{item.quantity}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

Row.propTypes = {
	// row: PropTypes.shape({
	// 	calories: PropTypes.number.isRequired,
	// 	carbs: PropTypes.number.isRequired,
	// 	fat: PropTypes.number.isRequired,
	// 	history: PropTypes.arrayOf(
	// 		PropTypes.shape({
	// 			amount: PropTypes.number.isRequired,
	// 			customerId: PropTypes.string.isRequired,
	// 			date: PropTypes.string.isRequired
	// 		})
	// 	).isRequired,
	// 	name: PropTypes.string.isRequired,
	// 	price: PropTypes.number.isRequired,
	// 	protein: PropTypes.number.isRequired
	// }).isRequired
};

export default function Orders() {
	const pageLimit = 9;
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<Card>
			<CardHeader title={<Typography variant='h4'>My Orders</Typography>} />
			{data.length ? (
				<TableContainer component={Paper}>
					<Table aria-label='collapsible table'>
						<TableHeader />
						<TableBody>
							{data.slice(offset, offset + pageLimit).map((row) => (
								<Row key={row.name} row={row} />
							))}
						</TableBody>
					</Table>
					<Pagination
						data={data.length}
						pageLimit={pageLimit}
						setOffset={setOffset}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</TableContainer>
			) : (
				<EmptyList />
			)}
		</Card>
	);
}
