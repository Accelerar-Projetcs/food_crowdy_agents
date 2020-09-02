import Palette from '../../../theme/palette';


export default (theme) => {
	return {
		root: {
			background: Palette.background.default,
			height: 500
		},
		textField: {
			margin: theme.spacing(1, 0)
		}
	};
};
