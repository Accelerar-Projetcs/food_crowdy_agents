import { agentApi, ProductsApi, AdminApi } from '../server/Server';

export const agentProducts = async (url) => {
	const res = await agentApi.get(url);
	return res;
};


export const AllProducts = async (url) => {
	const res = await ProductsApi.get(url);
	return res;
};

export const AdminPendingProducts = async (url) => {
	const res = await AdminApi.get(url);
	return res;
};
