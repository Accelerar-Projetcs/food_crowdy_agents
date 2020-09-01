import React from 'react';
import Table from '../Table/Table';

const Customer = () => {
	return (
		<div>
			<Table title='FrontLine Agents' Products={[{
						id: 1,
						name: 'michael chiboy',
						noOfPurchase: 300
					},
					{
						id: 2,
						name: 'michael chiboy',
						noOfPurchase: 300
					},
					{
						id: 3,
						name: 'michael chiboy',
						noOfPurchase: 300
					},]} />
		</div>
	);
};

export default Customer;