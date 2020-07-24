import React, { useState, createContext } from 'react';
import { toast } from 'react-toastify';
import { ProductsApi, agentUser } from '../../server/Server';
import { getUserId } from '../../utils/localStore';

/**
 * using a global notification state for user signup and sign in
 **/

export const SearchContext = createContext();

const ContextProvider = ({ children }) => {
	// const history = useHistory();
	const [dealDisplay, setDealDisplay] = useState([]);
	const [dealTosend, setDealToSend] = useState([]);
	const [loading, setLoading] = useState(false);
	const agentId = getUserId();

	const logoutUser = async (e, history) => {
		e.preventDefault();
		try {
			localStorage.clear();
			history.push('/');
		} catch (error) {}
	};

	const postOffer = (history) => {
		// if (!dealDisplay.length) {
		// 	return toast.warning('You have not added any offer yet', {
		// 		position: toast.POSITION.TOP_RIGHT,
		// 		autoClose: 5000
		// 	});
		// }
		console.log('dskcdslk');
		setLoading(true);
		// try {
		dealDisplay.forEach(async (deal) => {
			const data = new FormData();
			data.append('farmName', deal.farmerName);
			data.append('title', deal.title);
			data.append('agentId', '5f0cf5aa62844618287096a7');
			data.append('farmerId', deal.farmerId);
			data.append('deal', deal.deal);
			data.append('agentPriceOffer', deal.price);
			data.append('qty', deal.qty);
			data.append('location', deal.location);
			data.append('image', deal.file);
			data.append('videoURL', deal.videoURL);
			const res = await ProductsApi.post(
				`/createuploadrequest/${agentId}`,
				data
			);
			toast.success('Offer Uploaded succesfully', {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 5000
			});
		});

		setDealToSend([]);
		setLoading(false);
		history.push(`/products`);
		// } catch (error) {
		toast.error('There was a problem in uploading your product', {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000
		});
		setLoading(false);
		// }
	};

	return (
		<contextApi.Provider
			value={{
				dealDisplay,
				setDealDisplay,
				setDealToSend,
				dealTosend,
				postOffer,
				logoutUser,
				loading,
				setLoading
			}}>
			{children}
		</contextApi.Provider>
	);
};

export default ContextProvider;
