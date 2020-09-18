import { useState, useEffect } from 'react';
import { agentApi } from '../server/Server';
import useHeader from '../server/Headers';
import { errorHandler } from '../errors/errorHandler';

const useAgents = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { headers } = useHeader('');

	const getData = async (apiUrl) => {
		let res;
		setLoading(true);
		try {
			if (headers && headers['x-auth-token']) {
				res = await agentApi.get(apiUrl, { headers });
				setData(res.data);
			} else {
				res = await agentApi.get(apiUrl);
				setData(res.data);
			}
		} catch (error) {
			const errorMgs = errorHandler(error);
			setError(errorMgs);
		}
		setLoading(false);
		return res;
	};

	useEffect(() => {
		getData(url);
		// eslint-disable-next-line
	}, [url]);

	return {
		data,
		loading,
		error
	};
};

export default useAgents;
