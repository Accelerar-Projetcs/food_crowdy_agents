let PUBLIC_URL = '';
let PUBLIC_URL_MAIN = '';

const PROD_URL = 'https://agents.foodcrowdy.com/';
const DEV_URL = 'http://localhost:3000';

const PROD_URL_MAIN = 'https://foodcrowdy.com/';
const DEV_URL_MAIN = 'http://localhost:3000';

if (process.env.NODE_ENV === 'development') {
	PUBLIC_URL = DEV_URL;
	PUBLIC_URL_MAIN = DEV_URL_MAIN;
} else {
	PUBLIC_URL = PROD_URL;
	PUBLIC_URL_MAIN = PROD_URL_MAIN;
}

export { PUBLIC_URL, PUBLIC_URL_MAIN };
