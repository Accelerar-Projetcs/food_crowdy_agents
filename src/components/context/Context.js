import React, { useState, createContext, useEffect } from 'react';
import { getUserId, getUniqueId } from '../../utils/localStore';
// import { useHistory } from 'react-router-dom';
import { agentProducts } from '../../utils/FetchData';

export const contextApi = createContext();

const ContextProvider = ({ children }) => {
	const [dealDisplay, setDealDisplay] = useState([]);
	const [dealTosend, setDealToSend] = useState([]);
	const [loading, setLoading] = useState(false);

	//****Cart****//
	const [cartState, setCartState] = useState({
		right: false
	});

	//*****Email Verifaction State****//
	const [mailCheck, setmailCheck] = useState(true);
	const agentId = getUserId();
	const agentUnId = getUniqueId();

	//****Agent Approved and pending products ******//
	const [approvedProducts] = useState([]);
	const [pendingProducts, setPendingProducts] = useState([]);

	//****Regsitration state ******//
	const [authUpdate, setauthUpdate] = useState(false);

	useEffect(() => {
		if (agentUnId) {
			agentProducts(`/agent/myupload/pending/${agentUnId}`)
				.then((data) => {
					setPendingProducts(data.data);
				})
				.catch((err) => {});

			// agentProducts(`/agent/myupload/approved/${agentUnId}`).then((data) => {
			// 	setApprovedProducts(data.data);
			// });
		}
	}, [agentId, loading, agentUnId]);

	//||----Search Context Manipulation for filtering Products------||

	return (
		<contextApi.Provider
			value={{
				dealDisplay,
				setDealDisplay,
				setDealToSend,
				dealTosend,
				// postOffer,
				loading,
				setLoading,
				pendingProducts,
				approvedProducts,
				mailCheck,
				setmailCheck,
				authUpdate,
				setauthUpdate,
				cartState,
				setCartState
			}}>
			{children}
		</contextApi.Provider>
	);
};

export default ContextProvider;
