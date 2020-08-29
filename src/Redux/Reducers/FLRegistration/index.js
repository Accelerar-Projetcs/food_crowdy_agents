import { createSlice } from '@reduxjs/toolkit';

const insertObjectFields = (state, action) => {
	const details = action.payload;
	const data = state.form;
	return { ...data, ...details };
};

const initialState = {
	form: {},
	step: {
		activeStep: 0
	}
};
const FrontLineAgents = createSlice({
	name: 'FrontlineAgents',
	initialState,
	reducers: {
		
		getDetails(state, action) {
			state.form = insertObjectFields(state, action);
			return state;
		},

		pictureUpload(state, action) {
			const files = action.payload;
			const data = state.form;
			console.log(files);
			state.form = { ...data, files };
			return state;
		},
		handleNext(state, action) {
			const activeState = state.step;
			state.step = { ...activeState, activeStep: action.payload };
			return state;
		},
		handleBack(state, action) {
			const activeState = state.step;
			state.step = { ...activeState, activeStep: action.payload };
			return state;
		}
	}
});

export const {
	handleBack,
	handleNext,
	declaration,
	businessDetails,	
	getDetails,
	guarantorDetails,
	pictureUpload
} = FrontLineAgents.actions;

export default FrontLineAgents.reducer;
