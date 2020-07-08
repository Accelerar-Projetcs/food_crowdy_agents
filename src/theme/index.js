import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  palette: {
		primary: {
			main: '#008080'
		},
		// primary: {
		// 	main: '#008080'
		// },
		secondary: {
			main: '#FFCC2A'
		}
		// secondary: {
		// 	main: '#04ff57',
		// },
	},
	typography: {
		fontFamily: ['Arial, Helvetica, sans-serif'].join(',')
	}
});

export default theme;
