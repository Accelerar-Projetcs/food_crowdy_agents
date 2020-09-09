import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const TableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>Order Ref</TableCell>
				<TableCell>Delivery Status</TableCell>
				<TableCell>Payment Status</TableCell>
				<TableCell>Email</TableCell>
				<TableCell>Date</TableCell>
				<TableCell>Total</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default TableHeader;
