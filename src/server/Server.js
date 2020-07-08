import axios from 'axios';

export const BulkShareApi = axios.create({
	baseURL: 'http://localhost:8001/bulkshare',
	responseType: 'json'
});

export const ProductsApi = axios.create({
	baseURL: 'http://localhost:3005/products',
	responseType: 'json'
});
export const agentApi = axios.create({
	baseURL: 'http://localhost:3002/',
	responseType: 'json'
});

export const agentUser = axios.create({
	baseURL: 'http://localhost:3002/agent/user',
	responseType: 'json'
});

export const AdminApi = axios.create({
	baseURL: 'http://localhost:3001/admin/products',
	responseType: 'json'
});

export const AdminUser = axios.create({
	baseURL: 'http://localhost:3001/admin/user',
	responseType: 'json'
});
