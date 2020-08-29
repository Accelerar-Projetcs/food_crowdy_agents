export default (theme) => ({
	root: {},
	typograghy: {
		margin: theme.spacing(1)
	},
	TextField: {
		margin: theme.spacing(1, 0)
	},
	typograghyTitle: {
		color: theme.palette.primary.main
	},
	card: {
		background: theme.palette.background.default
	},
	label: {
		fontWeight: '700'
	},
	selectEmpty: {
		marginTop: theme.spacing(0.2)
	},
	text: {
		textAlign: 'left',
		margin: theme.spacing(1, 0)
	},

	input: {
		'&:focus': {
			border: theme.palette.primary.main
		}
	},
	margin: {
		margin: theme.spacing(1)
	},
	paper: {
		// width: 1000,
		// display: 'flex',
		// justifyContent: 'center',
		// flexFlow: 'column nowrap',
		// alignItems: 'center',
		// display: 'none',
		// [theme.breakpoints.up('sm')]: {
		// 	width: '100%'
		// },
		textAlign: 'center',
		margin: theme.spacing(4, 'auto')
	}
});
