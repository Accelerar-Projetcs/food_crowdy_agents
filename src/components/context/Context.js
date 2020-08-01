import React, { useState, createContext, useEffect } from 'react';
// import { toast } from 'react-toastify';
import { ProductsApi } from '../../server/Server';
import { getUserId, getUniqueId } from '../../utils/localStore';
// import { useHistory } from 'react-router-dom';
import { agentProducts } from '../../utils/FetchData';
export const contextApi = createContext();

const ContextProvider = ({ children }) => {
	const [dealDisplay, setDealDisplay] = useState([]);
	const [dealTosend, setDealToSend] = useState([]);
	const [loading, setLoading] = useState(false);
	const agentId = getUserId();
	const agentUnId = getUniqueId();
	// const history = useHistory();
	//****Agent Approved and pending products ******//
	const [approvedProducts, setApprovedProducts] = useState([]);
	const [pendingProducts, setPendingProducts] = useState([]);

	// const postOffer = async () => {
	// 	if (!dealDisplay.length) {
	// 		return toast.warning('You have not added any offer yet', {
	// 			position: toast.POSITION.TOP_RIGHT,
	// 			autoClose: 5000
	// 		});
	// 	}
	// 	setLoading(true);
	// 	console.log(dealDisplay);

	// 	dealDisplay.forEach(async (deal) => {
	// 		try {
	// 			setLoading(true);
	// 			const data = new FormData();
	// 			data.append('farmName', deal.farmerName);
	// 			data.append('title', deal.title);
	// 			data.append('agentId', agentId);
	// 			data.append('farmerId', deal.farmerId);
	// 			data.append('deal', deal.deal);
	// 			data.append('agentPriceOffer', deal.price);
	// 			data.append('phoneNumber', deal.phoneNumber);
	// 			data.append('quantity', deal.qty);
	// 			data.append('location', deal.location);
	// 			data.append('image', deal.file);
	// 			data.append('videoURL', deal.videoURL);
	// 			const res = await ProductsApi.post(
	// 				`/createuploadrequest/${agentId}`,
	// 				data
	// 			);
	// 			setLoading(false);
	// 		} catch (error) {
	// 			toast.error('problem uploading offer try again');
	// 		}

	// 		if (res.data) {
	// 			toast.success('Offer Uploaded succesfully', {
	// 				toastId: 'custom-id'
	// 			});
	// 			// history.goBack();

	// 			setLoading(false);
	// 		} else {
	// 			setLoading(false);
	// 		}
	// 	});

	// 	setDealToSend([]);
	// 	// setLoading(false);

	// 	setLoading(false);
	// };
	useEffect(() => {
		if (agentUnId) {
			agentProducts(`/agent/myupload/pending/${agentUnId}`).then((data) => {
				setPendingProducts(data.data);
			});

			agentProducts(`/agent/myupload/approved/${agentUnId}`).then((data) => {
				setApprovedProducts(data.data);
			});
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
				approvedProducts
			}}>
			{children}
		</contextApi.Provider>
	);
};

export default ContextProvider;
