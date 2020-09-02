import palette from '../../../../theme/palette';

export default (theme) => ({
	root: {
		margin: theme.spacing(1.2, 0)
	},
	label: {
		display: 'block',
		fontSize: '1.2rem',
		margin: theme.spacing(0, 0, 0, 0.4)
	},
	header: {
		margin: theme.spacing(2)
		// textAlign: 'center'
	},
	block: {
		margin: theme.spacing(1)
	},
	Btn: {
		textTransform: 'lowerCase'
	},
	input: {
		background: palette.background.default,
		padding: theme.spacing(1),
		border: 'none',
		height: '2rem',
		borderRadius: '.4rem',
		width: '70%',
		margin: theme.spacing(0.5),
		'&:focus': {
			outline: 'none'
		}
	}
});
