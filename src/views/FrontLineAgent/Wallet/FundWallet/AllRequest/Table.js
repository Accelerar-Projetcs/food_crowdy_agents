import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import useAgent from '../../../../../hooks/useAgent';
import useHeader from '../../../../../server/Headers';
import StatusBullet from '../../../../../components/StatusBullet/StatusBullet';
import LoadingCenter from '../../../../../components/LoadingCenter/LoadingCenter';
import EmptyList from '../../../../../components/EmptyList/EmptyList';
import { formatter } from '../../../../../utils/localStore';
import { statusColors } from '../../../../../utils/StatusColors';
import Pagination from '../../../../../components/Pagination/Pagination';
import { Delete } from '@material-ui/icons';
import { agentApi } from '../../../../../server/Server';
import { toast } from 'react-toastify';

import { errorHandler } from '../../../../../errors/errorHandler';

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

const RequestTable = () => {
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [loader, setloader] = useState(false);
	const classes = useStyles();
	const pageLimit = 12;
	const { headers } = useHeader();
	const { data, loading } = useAgent(`/wallet`, headers);


	const discardWithdrawalRequest = async (id) => {
		setloader(true);
		try {
			await agentApi.delete(`/wallet/request-withdrawal/${id}`, {
				headers
			});
			toast.success(`Your withdrawal request has been succesfully`);
		} catch (error) {
			errorHandler(error);
		}
		setloader(false);
	};

	useEffect(() => {}, [loader]);

	return (
		<>
			{loading ? (
				<LoadingCenter />
			) : (
				<Card className={classes.root}>
					<CardContent className={classes.content}>
						{data.length ? (
							<PerfectScrollbar>
								<div className={classes.inner}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Requested Amount</TableCell>
												<TableCell>Status</TableCell>
												<TableCell>Date</TableCell>
												<TableCell>Delete</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{data.slice(offset, offset + pageLimit).map((order) => (
												<TableRow hover key={order._id}>
													<TableCell>
														{formatter.format(order.amount)}
													</TableCell>
													<TableCell>
														{order.status} {''}
														<StatusBullet
															size='sm'
															color={statusColors[order.status]}
														/>
													</TableCell>
													<TableCell>
														{moment(Date.now()).format('DD/MM/YYYY')}
													</TableCell>
													<TableCell
														onClick={() => discardWithdrawalRequest(order._id)}>
														{loader ? (
															<CachedIcon  />
														) : (
															<Delete color='error' />
														)}
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

export default RequestTable;
