import Palette from '../../theme/palette';

export default (theme) => {
	return {
		root: {
			background: Palette.background.default,
			height: 500
		},
		paper: {
			display: 'flex',
			justifyContent: 'center',
			flexFlow: 'column nowrap',
			margin: theme.spacing(3, 'auto'),
			width: '80%'
		},
		card: {
			textAlign: 'center',
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
		icon2: {
			color: Palette.error.main,
			height: '4rem ',
			width: '4rem '
		},
		link: {
			margin: theme.spacing(2, 0)
		},
		tag: {
			color: Palette.secondary.main,
			margin: theme.spacing(0, 1),
			textDecoration: 'underline'
		}
	};
};
