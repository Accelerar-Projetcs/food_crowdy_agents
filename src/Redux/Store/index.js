import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer from '../Reducers';

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			// Ignore these action types
			ignoredActions: ['pictureUpload'],
			// Ignore these field paths in all actions
			ignoredActionPaths: ['meta.arg', 'payload.files'],
			// // Ignore these paths in the state
			// ignoredPaths: ['items.dates']
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
