import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

// let customFontSize = responsiveFontSizes(theme);

const theme = createMuiTheme({
	palette,
	typography,
	overrides,
	// customFontSize,
	zIndex: {
		appBar: 1200,
		drawer: 1100
	}
});

export default theme;
