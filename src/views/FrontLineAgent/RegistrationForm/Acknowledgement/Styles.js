import Palette from '../../../../theme/palette';

export default (theme) => {
	return {
		root: {},
		iconmail: {
			margin: theme.spacing(0, 0, -1, 1)
		},
		mail: {
			color: Palette.black,
			margin: theme.spacing(3, 0)
		},
		card: {
			textAlign: 'center',
			boxShadow: 'none',
			'& >*': {
				margin: theme.spacing(2, 0)
			}
		},
		btn: {
			margin: theme.spacing(3, 0, 0, 0),
			textAlign: 'center',
			background: Palette.tetiary.main,
			color: '#fff'
		},
		icon: {
			color: Palette.success.main,
			height: '4rem ',
			width: '4rem '
		},
		link: {
			margin: theme.spacing(2, 0)
		}
	};
};
