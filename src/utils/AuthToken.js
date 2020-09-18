export const saveUserDetails = (user) => {
	const currentUser = {};
	currentUser.id = user._id;
	currentUser.uniqueId= user.uniqueId;
	currentUser.firstName = user.firstName;
	currentUser.lastName = user.lastName;
	currentUser.email = user.email;
	currentUser.role = user.role;
	currentUser.state = user.state;
	localStorage.setItem('_FCAgent_', JSON.stringify(currentUser));
};


export const getAuthToken = () => {
	if (localStorage.getItem('_token')) {
		return JSON.parse(localStorage.getItem('_token'));
	} else {
		return null;
	}
};

export const saveAuthToken = (token) => {
	localStorage.setItem('_token', JSON.stringify(token));
};
