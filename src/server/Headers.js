import { useCookies } from 'react-cookie';

const Headers = () => {
	const [cookies] = useCookies(['x-auth-token']);

	return {
		headers: {
			'content-Type': 'application/json',
			Authorization: `Bearer ${cookies['x-auth-token']}`
		}
	};
};

export default Headers;
