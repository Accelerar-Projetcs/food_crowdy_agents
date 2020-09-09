import React, { useState, createContext } from 'react';

export const contextApi = createContext();

const ContextProvider = ({ children }) => {
	const [dealDisplay, setDealDisplay] = useState([]);
	const [dealTosend, setDealToSend] = useState([]);
	const [loading, setLoading] = useState(false);

	//****Frontline Agents image State***//
	const [imageFile, setImageFile] = useState({ files: '' });

	//****Cart****//
	const [cartState, setCartState] = useState({
		right: false
	});

	//*****Email Verifaction State****//
	const [mailCheck, setmailCheck] = useState(true);

	//****Agent Approved and pending products ******//
	const [approvedProducts] = useState([]);
	const [pendingProducts] = useState([]);

	//****Regsitration state ******//
	const [authUpdate, setauthUpdate] = useState(false);

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
				setCartState,
				imageFile,
				setImageFile
			}}>
			{children}
		</contextApi.Provider>
	);
};

export default ContextProvider;
