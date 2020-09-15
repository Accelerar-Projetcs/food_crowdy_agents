import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const TableHeader = (props) => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>User ID</TableCell>
				<TableCell>Name</TableCell>
				<TableCell>PhoneNumber</TableCell>
				<TableCell>Registration Date</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default TableHeader;
