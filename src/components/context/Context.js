import React, { useState, createContext, useEffect } from 'react';

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

	return (
		<contextApi.Provider
			value={{ dealDisplay, setDealDisplay, setDealToSend, dealTosend }}>
			{children}
		</contextApi.Provider>
	);
};

export default ContextProvider;
