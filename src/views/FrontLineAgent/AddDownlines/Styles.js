// import Palette from '../../../theme/palette';

export default (theme) => {
	return {
		root: {
			// height: 800,
			display: 'flex',
			justifyContent: 'center',
			flexFlow: 'column nowrap',
			margin: theme.spacing(3, 'auto')
			// width: '60%'
		},
		checkMail: {
			textAlign: 'center',
			// width: '100%',
			boxShadow: 'none'
		},
		content: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		},
		btn: {
			margin: theme.spacing(1)
		},
		paper: {
      width: 800,
      display: 'flex',
			justifyContent: 'center',
      flexFlow: 'column nowrap',
      alignItems: 'center',
			// display: 'none',
			// [theme.breakpoints.up('sm')]: {
			// 	width: '100%'
			// },
			margin: theme.spacing(3, 'auto')
		},
		card: {
			textAlign: 'center',
			'& >*': {
				margin: theme.spacing(1, 0)
			},
			display: 'flex',
			justifyContent: 'center',
			flexFlow: 'column nowrap',
			margin: theme.spacing(3, 'auto')
		},
		check: {
			color: theme.palette.success.main,
			fontSize: '3rem '
		},
		pending: {
			color: theme.palette.warning.main,
			fontSize: '3rem '
		},
		avatar: {
			height: '5rem',
			width: '5rem',
      margin: theme.spacing(3, 'auto')
		}
	};
};
