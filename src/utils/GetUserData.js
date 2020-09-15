export const userData = (info) => {
	if (localStorage.getItem('_FCAgent_')) {
		try {
			const userID = JSON.parse(localStorage.getItem('_FCAgent_'));
			return userID[info];
		} catch (error) {
			return null;
		}
	} else {
		return null;
	}
};

export const clearUserData = () => localStorage.removeItem('_FCAgent_');
