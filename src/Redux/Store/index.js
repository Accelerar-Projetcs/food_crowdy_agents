import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer from '../Reducers';

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: ['FrontlineAgents/pictureUpload'],
			ignoredActionPaths: ['meta.arg', 'FrontlineAgents/pictureUpload'],
		}
	})
});

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('../Reducers', () => {
		const newRootReducer = require('../Reducers').default;
		store.replaceReducer(newRootReducer);
	});
}

export default store;
