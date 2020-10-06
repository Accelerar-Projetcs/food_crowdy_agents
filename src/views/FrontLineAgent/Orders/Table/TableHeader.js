import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const TableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell></TableCell>
				<TableCell>Order Ref</TableCell>
				<TableCell>Delivery Status</TableCell>
				<TableCell>Delivery Fee</TableCell>
				<TableCell>Payment Status</TableCell>
				<TableCell>Total</TableCell>
				<TableCell>Date</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default TableHeader;
