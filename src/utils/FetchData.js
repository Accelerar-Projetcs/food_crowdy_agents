import { agentApi, ProductsApi, AdminApi } from '../server/Server';
import { headers } from '../server/Headers';

export const agentProducts = async (url) => {
	const res = await agentApi.get(url, { headers });
	return res;
};

// console.log(headers);

export const AllProducts = async (url) => {
	const res = await ProductsApi.get(url);
	return res;
};

export const AdminPendingProducts = async (url) => {
	const res = await AdminApi.get(url);
	return res;
};
