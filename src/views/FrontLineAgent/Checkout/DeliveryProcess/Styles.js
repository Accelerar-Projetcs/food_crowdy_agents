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
	formControl: {
		margin: theme.spacing(1, 0.2),
		minWidth: 120
	},
	formControl2: {
		margin: theme.spacing(3, 0.2),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(0.2)
	},
	text: {
		textAlign: 'left',
		margin: theme.spacing(1, 0),
	},
	location: {
		textAlign: 'center',
		margin: theme.spacing(1.4, 0),
	},
	input: {
		'&:focus': {
			border: theme.palette.primary.main
		}
	},
});
