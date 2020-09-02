import React from 'react';
import { Router } from 'react-router-dom';
import theme from './theme';
import Routes from './Routes';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

// filepond plugin registration
import { registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const browserHistory = createBrowserHistory();

export default () => {
	return (
		<CookiesProvider>
			<ThemeProvider theme={theme}>
				<Router history={browserHistory}>
					<Routes />
					<ToastContainer hideProgressBar={true} />
				</Router>
			</ThemeProvider>
		</CookiesProvider>
	);
};
