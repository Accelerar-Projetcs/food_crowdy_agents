import React, { useContext } from 'react';
import { contextApi } from '../../../../components/context/Context';
import Table from '../Table/Table';

const ApprovedDeals = () => {
	const { approvedProducts } = useContext(contextApi);
	return (
		<div>
			<Table data={approvedProducts} status={'approved'} title="Approved" />
		</div>
	);
};

export default ApprovedDeals;
