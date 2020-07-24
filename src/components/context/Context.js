import React, { useState, createContext } from 'react';
import { toast } from 'react-toastify';

/**
 * using a global notification state for user signup and sign in
 */

export const contextApi = createContext();

const ContextProvider = ({ children }) => {
	const [dealDisplay, setDealDisplay] = useState([]);
	const [dealTosend, setDealToSend] = useState([]);

	const logoutUser = async (e, history) => {
		e.preventDefault();
		console.log('logout');
		const token = JSON.parse(localStorage.getItem('_token'));
		console.log(token);

		// try {
		// 	await userApi.post(`/logout`, {
		// 		headers: {
		// 			'content-Type': 'application/json',
		// 			'Authorization': `Bearer  ${token}`
		// 		}
		// 	});
		// 	localStorage.removeItem('_token');
		// 	history.push('/');
		// } catch (error) {
		// 	console.log({ error });
		// }
	};

	const postOffer = () => {
		// try {
		// 	const res = await ProductsApi.post(
		// 		`/create/${productDetails.agentId}`,
		// 		data
		// 		// header
		// 	);
		// 	setLoading(false);
		// 	console.log(res);
		toast.success('product Uploaded succesfully', {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000
		});
		// setOpen(false);

		// 	console.log(res);
		// } catch (error) {
		// 	// setAlert(true);
		// 	console.log({ error });
		// 	toast.error('There was a problem in uploading your product', {
		// 		position: toast.POSITION.TOP_RIGHT,
		// 		autoClose: 5000
		// 	});
		// 	console.log(error);
		// }
		// setLoading(false);
	};

	return (
		<contextApi.Provider
			value={{
				dealDisplay,
				setDealDisplay,
				setDealToSend,
				dealTosend,
				postOffer,
				logoutUser
			}}>
			{children}
		</contextApi.Provider>
	);
};

export default ContextProvider;