

const BASE_URL = {
	AGENTS: `${process.env.REACT_APP_AGENT_API}/api`,
};


if (process.env.NODE_ENV === 'production') {
	console.log = function () { };
}

export { BASE_URL };
