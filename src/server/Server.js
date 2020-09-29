import axios from 'axios';
import { BASE_URL } from './index';

const {  AGENTS } = BASE_URL;

export const agentApi = axios.create({
	baseURL: AGENTS,
	responseType: 'json'
});
