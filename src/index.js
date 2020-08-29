import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import App from './App';
import ContextProvider from './components/context/Context';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
	<Provider store={Store}>
		<ContextProvider>
			<App />
		</ContextProvider>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
