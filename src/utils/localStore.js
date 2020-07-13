export const getUserName = () => {
	if (localStorage.getItem('_user')) {
		const nameID = JSON.parse(localStorage.getItem('_user'));
		return nameID.name;
	} else {
		return null;
	}
};

export const getUserId = () => {
	if (localStorage.getItem('_user')) {
		const userID = JSON.parse(localStorage.getItem('_user'));
		return userID.id;
	} else {
		return null;
	}
};

export const clearUserOfflineDatas = () => {
	localStorage.removeItem('_cart');
};

export const formatter = new Intl.NumberFormat('en-NG', {
	style: 'currency',
	currency: 'NGN'
});
