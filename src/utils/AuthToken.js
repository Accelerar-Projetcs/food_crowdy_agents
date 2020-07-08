export const saveUserDetails = (newUser) => {
	const currentUser = {};
	currentUser.id = newUser._id;
	currentUser.name = newUser.name;
	currentUser.role = newUser.role;
	localStorage.setItem('_user', JSON.stringify(currentUser));
};

export const getAuthToken = () => {};

export const saveAuthToken = (token) => {
	localStorage.setItem('_token', JSON.stringify(token));
};
