import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../Table/Agents';

const Customer = () => {
	const state = useSelector((state) => state.Marketers.customers);
	return (
		<div>
			<Table title='FrontLine Agents' Products={state} />
		</div>
	);
};

export default Customer;
