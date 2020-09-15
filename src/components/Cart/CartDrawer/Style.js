import palette from '../../../theme/palette';

export default (theme) => ({
	list: {
		width: 500,
		[theme.breakpoints.down('md')]: {
			width: 300
		}
	},
	fullList: {
		width: 'auto'
	},
	button: {
		color: palette.tetiary.main
	}
});
