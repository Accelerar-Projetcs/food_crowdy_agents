export default (theme) => {
	return {
		checkMail: {
			textAlign: 'center',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexFlow: 'column nowrap'
		},

		btn: {
			margin: theme.spacing(1, 0)
		},
		paper: {
			[theme.breakpoints.up('sm')]: {
				width: '40%'
			},
			margin: theme.spacing(5, 'auto')
		}
	};
};
