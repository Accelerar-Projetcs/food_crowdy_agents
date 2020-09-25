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
			width: '95%',
			margin: theme.spacing(1, 'auto'),
			[theme.breakpoints.up('md')]: {
				width: '30%'
			}
		}
	};
};
