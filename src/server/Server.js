import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

// export const BulkShareApi = axios.create({
// 	baseURL: 'http://localhost:8001/bulkshare',
// 	responseType: 'json'
// });

// export const ProductsApi = axios.create({
// 	baseURL: 'http://localhost:3005/products',
// 	responseType: 'json'
// });
export const agentApi = axios.create({
	// baseURL: 'http://localhost:3002/',
	baseURL: 'https://m1.foodcrowdy.com/',
	responseType: 'json'
});

export const agentUser = axios.create({
	baseURL: 'http://localhost:3002/agent/user',
	// baseURL: 'https://m1.foodcrowdy.com/agent/user',
	responseType: 'json'
});

export const BulkShareApi = axios.create({
	baseURL: 'https://m3.foodcrowdy.com/bulkshare',
	responseType: 'json'
});

export const ProductsApi = axios.create({
	baseURL: 'https://m5.foodcrowdy.com/products',
	responseType: 'json'
});

export const ProductsApiHooks = makeUseAxios({
	axios: axios.create({
		baseURL: 'http://localhost:3005/products',
		// baseURL: 'https://m5.foodcrowdy.com/products',
		responseType: 'json'
	})
});

export const userApi = axios.create({
	// baseURL: 'http://localhost:3006/users',
	baseURL: 'https://m6.foodcrowdy.com/users',
	responseType: 'json'
});

export const AdminApi = axios.create({
	baseURL: 'https://m1.foodcrowdy.com/admin',
	responseType: 'json'
});
