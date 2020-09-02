import { createSlice } from '@reduxjs/toolkit';
import { agentApi } from '../../../server/Server';
import { errorHandler } from '../../../errors/errorHandler';

const initialState = {
	customers: [],
	frontlineAgents: [],
	loading: false
};
const MarketerActions = createSlice({
	name: 'Marketers',
	initialState,
	reducers: {
		getCustomers(state, action) {
			const data = action.payload;
			state.customers = data;
			return state;
		},
		getFrontLineAgents(state, action) {
			const data = action.payload;
			state.frontlineAgents = data;
			return state;
		},
		setLoader(state) {
			state.loading = !state.loading;
			return state;
		}
	}
});

export function getData(url, action, setLoader, headers) {
	return async function (dispatch) {
		dispatch(setLoader());
		try {
			const res = await agentApi.get(url, { headers });
			dispatch(action(res.data));
		} catch (error) {
			errorHandler(error);
		}
		dispatch(setLoader());
	};
}

export const {
	getCustomers,
	getFrontLineAgents,
	setLoader
} = MarketerActions.actions;

export default MarketerActions.reducer;
