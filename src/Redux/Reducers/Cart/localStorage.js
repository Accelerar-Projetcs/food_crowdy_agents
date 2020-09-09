const getCartItemFromLocalStore = () => {
	const cartItems = localStorage.getItem('___shopping:cart');
	if (cartItems) {
		try {
			return JSON.parse(cartItems);
		} catch (error) {
			return [];
		}
	} else {
		return [];
	}
};

const saveCartItemInLocalStore = (data) => {
	localStorage.setItem('___shopping:cart', JSON.stringify(data));
};


export { saveCartItemInLocalStore, getCartItemFromLocalStore };
