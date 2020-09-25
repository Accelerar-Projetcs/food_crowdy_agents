import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,makeStyles
} from '@material-ui/core';
import useAgents from '../../../../hooks/useAgent';
import Pagination from '../../../../components/Pagination/Pagination';
import LoadingCenter from '../../../../components/LoadingCenter/LoadingCenter';

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

const OtherMarketers = () => {
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const classes = useStyles();
	const pageLimit = 12;
	const { data , loading } = useAgents(`/marketer/top-marketers`);

	return (
		<Card className={classes.root}>
			<CardHeader title='Markerters Activity Board' />
			<Divider />
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					{loading ? (
						<LoadingCenter />
					) : (
						<div className={classes.inner}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Markerters ID</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Users</TableCell>
										<TableCell>Agents</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.slice(offset, offset + pageLimit).map((user) => (
										<TableRow hover key={user._id}>
											<TableCell>{user.uniqueId}</TableCell>
											<TableCell>
												{user.firstName + ' ' + user.lastName}
											</TableCell>
											<TableCell>{user.agents.length}</TableCell>
											<TableCell>{user.users.length}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<Pagination
								pageLimit={pageLimit}
								setOffset={setOffset}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								data={data.length}
							/>
						</div>
					)}
				</PerfectScrollbar>
			</CardContent>
		</Card>
	);
};

export default OtherMarketers;
