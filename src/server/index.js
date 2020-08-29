let BASE_URL = {};

const DEV_URL_SERVICES = {
	AGENTUSERS: 'https://m2.foodcrowdy.com/agent/user1',
	PRODUCT: 'https://foodcrowdyproducttest.herokuapp.com/products',
	AGENTS: 'https://m2.foodcrowdy.com/1',
	ADMIN: 'https://m1.foodcrowdy.com/admin1'
};

const PROD_URL_SERVICES = {
	AGENTUSERS: 'https://m2.foodcrowdy.com/agent/user',
	PRODUCT: 'https://m5.foodcrowdy.com/products',
	AGENTS: 'https://m2.foodcrowdy.com/',
	ADMIN: 'https://m1.foodcrowdy.com/admin'
};

if (process.env.NODE_ENV === 'development') {
	BASE_URL = DEV_URL_SERVICES;
} else {
	BASE_URL = PROD_URL_SERVICES;
}

export { BASE_URL };
