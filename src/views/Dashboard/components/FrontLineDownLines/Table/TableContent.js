import React, { useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	makeStyles
} from '@material-ui/core';
import TableHeader from './TableHeader';
import Pagination from '../../../../../components/Pagination/Pagination';

const useStyles = makeStyles(() => ({
	inner: {
		minWidth: 800
	}
}));

const TableContent = ({ users = [] }) => {
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const classes = useStyles();
	const pageLimit = 5;

	return (
		<PerfectScrollbar>
			<div className={classes.inner}>
				<Table>
					<TableHeader />
					<TableBody>
						{users.slice(offset, offset + pageLimit).map((user) => (
							<TableRow hover key={user._id}>
								<TableCell>{user.uniqueId}</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.phoneNumber}</TableCell>
								<TableCell>
									{moment(user.createdAt).format('DD/MM/YYYY')}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Pagination
					data={users.length}
					pageLimit={pageLimit}
					setOffset={setOffset}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</PerfectScrollbar>
	);
};


export default TableContent;
