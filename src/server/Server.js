import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { BASE_URL } from './index';

const { AGENTUSERS, PRODUCT, AGENTS, ADMIN } = BASE_URL;

export const agentApi = axios.create({
	baseURL: AGENTS,
	responseType: 'json'
});

export const agentUser = axios.create({
	baseURL: AGENTUSERS,
	responseType: 'json'
});

export const ProductsApi = axios.create({
	baseURL: PRODUCT,
	responseType: 'json'
});

export const ProductsApiHooks = makeUseAxios({
	axios: axios.create({
		baseURL: PRODUCT,
		responseType: 'json'
	})
});
export const AdminApi = axios.create({
	baseURL: ADMIN,
	responseType: 'json'
});
