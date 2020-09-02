import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../Table/Customers';

const Customer = () => {
	const state = useSelector((state) => state.Marketers.customers);
	return (
		<div>
			<Table
				title='Customers'
				Products={state}
			/>
		</div>
	);
};

export default Customer;
