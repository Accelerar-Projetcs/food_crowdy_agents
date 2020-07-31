import { getAuthToken } from '../utils/AuthToken';

const token = getAuthToken();

export const headers = {
	'content-Type': 'application/json',
	Authorization: `Bearer ${token}`
};
