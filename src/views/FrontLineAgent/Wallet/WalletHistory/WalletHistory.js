import React, { useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';
import useAgent from '../../../../hooks/useAgent';
import useHeader from '../../../../server/Headers';
import StatusBullet from '../../../../components//StatusBullet/StatusBullet';
import LoadingCenter from '../../../../components/LoadingCenter/LoadingCenter';
import EmptyList from '../../../../components/EmptyList/EmptyList';
import { formatter } from '../../../../utils/localStore';
import { statusColors } from '../../../../utils/StatusColors';
import Pagination from '../../../../components/Pagination/Pagination';


const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 800
	},
	statusContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	status: {
		marginRight: theme.spacing(1)
	},
	actions: {
		justifyContent: 'flex-end'
	}
}));

const WalletHistory = () => {
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const classes = useStyles();
	const pageLimit = 12;
	const { headers } = useHeader();
	const { data, loading } = useAgent(`/wallet`, headers);

	
	return (
		<>
			{loading ? (
				<LoadingCenter />
			) : (
				<Card className={classes.root}>
					<CardHeader title='Transaction History' />
					<Divider />
					<CardContent className={classes.content}>
						{data.length ? (
							<PerfectScrollbar>
								<div className={classes.inner}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>ID</TableCell>
												<TableCell>Invoice REF</TableCell>
												<TableCell>Transaction REF</TableCell>
												<TableCell>Amount</TableCell>
												<TableCell>Type</TableCell>
												<TableCell>Description</TableCell>
												<TableCell>Date</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{data.slice(offset, offset + pageLimit).map((order) => (
												<TableRow hover key={order._id}>
													<TableCell>{order.agentId}</TableCell>
													<TableCell>{order.invoiceRef}</TableCell>
													<TableCell>{order.txRef.slice(0, 8)}..</TableCell>
													<TableCell>
														{formatter.format(order.amount)}
													</TableCell>
													<TableCell>
														{order.type}
														<StatusBullet
															size='sm'
															color={statusColors[order.type]}
														/>
													</TableCell>
													<TableCell>{order.description}</TableCell>
													<TableCell>
														{moment(order.createdAt).format('DD/MM/YYYY')}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
								<Pagination
									pageLimit={pageLimit}
									setOffset={setOffset}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									data={data.length}
								/>
							</PerfectScrollbar>
						) : (
							<EmptyList />
						)}
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default WalletHistory;
