export const saveUserDetails = (newUser) => {
	const currentUser = {};
	currentUser.id = newUser._id;
	currentUser.name = newUser.name;
	currentUser.uniqueId = newUser.uniqueId;
	currentUser.email = newUser.email;
	currentUser.role = newUser.role;
	localStorage.setItem('_user', JSON.stringify(currentUser));
};

export const getAuthToken = () => {
	const store = localStorage.getItem('_token');
	if (store) {
		const token = JSON.parse(store);
		return token;
	} else {
		return null;
	}
};

export const saveAuthToken = (token) => {
	localStorage.setItem('_token', JSON.stringify(token));
};
