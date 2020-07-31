import React, { useContext } from 'react';
import { contextApi } from '../../../../components/context/Context';
import Table from '../Table/Table';

const PendingOffers = () => {
	const { pendingProducts } = useContext(contextApi);
	return (
		<div>
			<Table data={pendingProducts} status={'pending'} title='Pending' />
		</div>
	);
};

export default PendingOffers;
