
export const Style = (theme) => ({
	root: {},
	grid: {
		// margin: theme.spacing(4, 0, 0, 0)
	},
	quoteContainer: {
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},

	content: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing(6, 0, 0, 0)
	},

	form: {
		paddingLeft: 100,
		paddingRight: 100,
		paddingBottom: 125,
		flexBasis: 700,
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		}
	},
	sugestion: {
		marginTop: theme.spacing(2),
		textAlign: 'left'
	},
	textField: {
		marginTop: theme.spacing(2)
	},
	signInButton: {
		margin: theme.spacing(2, 0)
	}
});
