import React from 'react';
import { Router } from 'react-router-dom';
import theme from './theme';
import Routes from './Routes';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import ContextProvider from './components/context/Context';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

// filepond plugin registration
import { registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';


import Cart from './components/Cart/CartDrawer/CartDrawer';
import ErrorBoundary from './views/ErrorBoundary/ErrorBoundary';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateSize);

const browserHistory = createBrowserHistory();
if (process.env.NODE_ENV === "production") {
	console.log = function () { };
}

export default () => {
	return (
		<ErrorBoundary>
			<CookiesProvider>
				<Provider store={Store}>
					<ContextProvider>
						<ThemeProvider theme={theme}>
							<Router history={browserHistory}>
								<Cart />
								<Routes />
								<ToastContainer hideProgressBar={true} />
							</Router>
						</ThemeProvider>
					</ContextProvider>
				</Provider>
			</CookiesProvider>
		</ErrorBoundary>

	);
};
